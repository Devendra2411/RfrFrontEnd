import { Injectable,  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgxPermissionsService } from 'ngx-permissions';
import { forkJoin } from 'rxjs/observable/forkJoin';

// models
import { Workflow } from '../common/classes/common-objects';
import { DatePipe } from '@angular/common';

@Injectable()
export class CommonService {

  commonData = new BehaviorSubject({});
  commonWhoAmi = new BehaviorSubject({});
  galTokenAuth = new BehaviorSubject({});
  commonOptionsData: any;
  commonDataPromise: any;
  private actionItemDataObj = new BehaviorSubject({});
  actionItemData = this.actionItemDataObj.asObservable();

  constructor(private http: HttpClient, private permissionsService: NgxPermissionsService
    , private datePipe: DatePipe) {
  }

  // For Getting Token in App Initialization
  initializeApp() {
    const whoAmIObser = this.http.get('/api/who-am-i');

    const promise = whoAmIObser.toPromise()
      .then(resp => {
        this.commonWhoAmi.next(resp);   // Storing User Details
        const perm = resp['roles'];
        this.permissionsService.loadPermissions(perm);
        return resp;
      }).catch(error => {
      });
    return promise;
  }

  updateActionitemData(formModel):any{
    this.actionItemDataObj.next(formModel);
  }

  getCommonOptions(): any {
    return this.http.get('/api/common-options');
  }

  _filterData(filter, returnType): any {
    let tempOption;
    if (returnType === 'MAP') {
      tempOption = new Map<string, string>();
      for (const [key, value] of Object.entries(this.commonData.value[filter])) {
        tempOption.set(value['id'], value['text']);
      }
    } else if (returnType === 'ARRAY') {
      tempOption = [];
      for (const [key, value] of Object.entries(this.commonData.value[filter])) {
        const tempObj = Object.create(null);
        tempObj['key'] = value['id'];
        tempObj['value'] = value['text'];
        tempOption.push(tempObj);
      }
    }
    return tempOption;
  }

  filterCommonOptions(filter, returnType): any {
    if (Object.keys(this.commonData.value).length === 0) {
      return new Observable((observer) => {
        this.getCommonOptions().subscribe((options) => {
          this.commonData.next(options as any);
          observer.next(this._filterData(filter, returnType));
        });
      });
    } else {
      return new Observable((observer) => {
        observer.next(this._filterData(filter, returnType));
      });
    }
  }

  getRFRProjects(): any {
    return this.http.get<any>('/api/rfr-workflow');
  }

  getOutageDetails(esnId: string): any {
    return this.http.get('/api/rfr-workflow/esn/' + esnId);
  }

  getSiteNames(): any {
    return this.http.get('/api/rfr-workflow/sites');
  }
  getOutageESNDetails(siteName: string): any {
    return this.http.post('/api/rfr-workflow/getBlocks' , { 'siteName': siteName });
  }
  getEsnList(): any {
    return this.http.get('/api/rfr-workflow/esn');
  }


  getSSOUsers(query): any {
    return this.http.get('/api/galSearch/' + query);
  }

  createRfrWorkflow(obj: any): any {
    console.log(JSON.stringify(obj));
    return this.http.post('/api/rfr-workflow', obj);
  }

  updateRfrWorkflow(obj: Workflow, workflowId: number): any {
    return this.http.put(`/api/rfr-workflow/${workflowId}`, obj);
  }

  getRfrWorkflow(workflowId: number) {
    return this.http.get(`/api/rfr-workflow/${workflowId}`);
  }


  getAllActionItems(workflowId: number): any {
    return this.http.get(`/api/rfr-workflow/${workflowId}/action-items`);

  }

  createActionItem(workflowId: number, actionItemData): any {
    return this.http.post(`/api/rfr-workflow/${workflowId}/action-items`, actionItemData);
  }

  updateActionItem(workflowId: number, actionItemId: number, actionItemData: any) {
    return this.http.put(`/api/rfr-workflow/${workflowId}/action-items/${actionItemId}`, actionItemData);
  }
  // START:Phone Page Services
  getPhoneLineItemsList(workflowId): any {
    return this.http.get(`/api/${workflowId}/phone-call`);
  }
  getPhoneMinutes(workflowId, meetingId): any {
    return this.http.get(`/api/${workflowId}/phone-call/minutes?meetingId=${meetingId}`);
  }

  updatePhoneMinutes(workflowId: any, meetingId: any, obj: any): any {
    return this.http.put(`/api/${workflowId}/phone-call?meetingId=${meetingId}`, obj);
  }
  createPhoneLineItem(workflowId, obj: any): any {
    return this.http.post(`/api/${workflowId}/phone-call`, obj);
  }
  // END:Phone Page Services

  getAllActionItemNotes(actionItemId: number): any {
    return this.http.get('/api/action-items/notes?actionItemId=' + actionItemId);
  }

  createActionItemNote(actionItemId: number, actionItemData: any): any {
    return this.http.post('/api/action-items/notes?actionItemId=' + actionItemId, { 'notes': actionItemData.content });
  }

  dateTimeFormatter(val: any) {
    if (val.toString().indexOf('.') > 0) {
      // r.dueDate = r.dueDate * 1000;
      return this.datePipe.transform(new Date(val * 1000), 'MM/dd/yyyy h:mm a');
    } else {
      val = val.toString() + '.0000';
      return this.datePipe.transform(new Date(val * 1000), 'MM/dd/yyyy h:mm a');
    }
  }
  dateFormatter(val: any) {
    if (val.toString().indexOf('.') > 0) {
      return this.datePipe.transform(new Date(val * 1000), 'MM/dd/yyyy');
    } else {
      val = val.toString() + '.0000';
      return this.datePipe.transform(new Date(val * 1000), 'MM/dd/yyyy');
    }
  }
  convertDateToTimeStamp(val: any) {
    return Date.parse(val) / 1000;
  }

  getSelectedActionItem(){
    return this.actionItemData;
  }

  createAttachmentActionItem(actionItemId,fileAttachments):any{
    const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    const req = new HttpRequest('POST', `/api/action-items/uploads?actionItemId=${actionItemId}`, fileAttachments,{headers: headers,reportProgress: true });
    return this.http.request(req);   
  }

  deleteAttachmentActionItem(actionItemId,fileAttachments):any{
    return this.http.put(`/api/action-items/uploads?actionItemId=${actionItemId}`,fileAttachments );
  }
}
