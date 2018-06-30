import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {CommonService} from './services/common.service';
import {BroadcastService} from './services/broadcast.service';


@Injectable()
export class RfrHttpInterceptor implements HttpInterceptor {
  token: string;

  constructor(private commonService: CommonService, private broadcast: BroadcastService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.commonService.commonWhoAmi.subscribe(val => {
      this.token = val['token'];
    });

    // Clone the request to add the new header.
    if (req.url.includes('/api') && !req.url.includes('/galSearch')) {
      this.broadcast.spinnerStatus.next(true);
    }

    let cloneReq;
    let headers = new HttpHeaders();
    if (this.token && req.url.includes('/api')) {
      headers = headers.set('Authorization', 'Bearer ' + this.token);
    } else {
      headers = req.headers;
    }
    // send the newly created request
    cloneReq = req.clone({headers});
    return next.handle(cloneReq)
      .do(event => {
        if (event instanceof HttpResponse) {
          this.broadcast.handleResponse(event, cloneReq);
        }
      })
      .catch((error, caught) => {
        this.broadcast.handleError(error);
        return Observable.throw(error);
      }) as any;

  }
}
