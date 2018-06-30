import { Injectable } from '@angular/core';
import { ErrorObject } from '../common/classes/error-object';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpErrorResponse, HttpResponse, HttpRequest } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable()
export class BroadcastService {
  spinnerStatus = new BehaviorSubject(true);
  alertStatus = new BehaviorSubject({ show: false, msg: '', title: '', type: '' });
  broadcastMessages = new BehaviorSubject([]);
  formObj: any = new BehaviorSubject({});
  serviceDown = new BehaviorSubject(false);
  timeout: any;

  constructor(private router: Router) {
    this.spinnerStatus.next(true);
  }

  handleError(error: HttpErrorResponse) {
    const messages: string[] = [];
    switch (error.status) {
      case 404:
        messages.push(error.error);
        this.broadcastMessages.next(messages);
        this.router.navigate(['/404']);
        break;
      case 401:
        messages.push('Invalid Token');
        this.broadcastMessages.next(messages);
        break;
      case 500:
        messages.push(error.error);
        this.broadcastMessages.next(messages);
        break;
      case 400:
        if (typeof error.error === 'string' || error.error instanceof String) {
          messages.push(<string>error.error);
          this.broadcastMessages.next(messages);
          break;
        } else {
          const errorCustomized: ErrorObject = error.error;
          const entries: any = Object.entries(error.error['fields']);
          for (const entry of entries) {
            const label = document.querySelector('label[for=\'' + entry[0] + '\']').innerHTML;
            switch (entry[1][0]['code']) {
              case 'required':
                messages.push(`Field '${label}' is required.`);
                break;
              case 'duplicate':
                if (entry[0] === 'outageId') {
                  messages.push(`ESN NUMBER and ${label} Combination has to be unique, but already exists.`);
                } else {
                  messages.push(`${label} has to be unique, but already exists.`);
                }
                break;
              case 'integer':
                messages.push(`${label} has to be an integer.`);
                break;
              case 'decimal':
                messages.push(`${label} has to be an integer or a decimal.`);
                break;
              case 'digits':
                messages.push(`${label} exceeds the possible precision of
                ${error['integerDigits']} integer and ${error['fractionalDigits']} fractional digits.`);
                break;
              case 'size':
                messages.push(`${label} size has to be min  of ${error['minSize']}  and max of ${error['maxSize']} characters.`);
                break;
              case 'min':
                messages.push(`${label} value has to be minimum of ${error['valueMin']}.`);
                break;
              case 'generic':
                messages.push(`Field '${label}' ${entry[1][0]['message']}.`);
                break;
              default:
                messages.push(`Field '${label}' didn't pass validation with error code '${error['code']}'.`);
                break;
            }
          }
          this.broadcastMessages.next(messages);
          break;
        }
      case 503:
        this.serviceDown.next(true);
        break;
    }
    this.spinnerStatus.next(false);

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.broadcastMessages.next([]);
    }, 10000);
  }

  handleResponse(event: HttpResponse<any>, cloneReq: HttpRequest<any>) {
    const response = event.body;
    this.spinnerStatus.next(false);
    if (cloneReq.method !== 'GET') {
      this.alertStatus.next({ show: true, msg: 'Completed Successfully', title: '', type: 'success' });
    }
    this.broadcastMessages.next([]);
  }
}
