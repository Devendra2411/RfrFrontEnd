import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ActionItemComponent } from './action-item.component';
import { CommonService } from '../services/common.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { ActionItemTimelineComponent } from '../action-item-timeline/action-item-timeline.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { TooltipModule } from 'primeng/tooltip';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { DataViewModule } from 'primeng/dataview';
import { DataTableModule } from 'primeng/primeng';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/primeng';
import {GrowlModule} from 'primeng/growl';
import {CheckboxModule} from 'primeng/checkbox';
import {ProgressBarModule} from 'primeng/progressbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {MatBadgeModule} from '@angular/material/badge';
import {FileUploadModule} from 'primeng/fileupload';
import { FilelengthPipe } from '../common/pipes/filelength.pipe';
import {ItemAttachmentComponent} from '../item-attachment/item-attachment.component';
import {BroadcastService} from '../services/broadcast.service';

class MockCommonService {
  commonData: BehaviorSubject<{}> = new BehaviorSubject({ 'outageTypes': [{ 'id': 'CALL_OUT', 'text': 'Call Out' }, { 'id': 'HGP', 'text': 'HGP' }, { 'id': 'MI', 'text': 'MI' }, { 'id': 'NA', 'text': 'NA' }, { 'id': 'ONSITE_TRAINING', 'text': 'On Site Training' }, { 'id': 'OTHER', 'text': 'Other' }, { 'id': 'TDI', 'text': 'TDI' }, { 'id': 'VALUE_PACK', 'text': 'Value Pack' }, { 'id': 'WARRANTY', 'text': 'Warranty' }], 'categories': [{ 'id': 'START_UP_CHECKLIST', 'text': 'Start-Up Checklist' }, { 'id': 'TUNING', 'text': 'Tuning' }, { 'id': 'GENERATOR', 'text': 'Generator' }, { 'id': 'CLEANLINESS', 'text': 'Cleanliness' }, { 'id': 'COMPLIANCE_CHECKLIST', 'text': 'Compliance Checklist' }, { 'id': 'MD_CENTER', 'text': 'MD Center' }, { 'id': 'AUDITS_COMM_PROCEDURES', 'text': 'Audits and Comissioning Procedures' }, { 'id': 'SITE_DEMOBILIZATION', 'text': 'Site Demobilization' }, { 'id': 'TUNING_KIT', 'text': 'Tuning Kit' }], 'status': [{ 'id': 'COMPLETE', 'text': 'Complete' }, { 'id': 'IN_COMPLETE', 'text': 'In Complete' }, { 'id': 'NA', 'text': 'NA' }], 'owner': [{ 'id': 'FE', 'text': 'FE' }, { 'id': 'CONTROLS_REQ_ENGINEER', 'text': 'Controls Req Engr' }, { 'id': 'IRFR_ADMIN', 'text': 'IRFR Admin' }, { 'id': 'OPS_CENTER', 'text': 'Ops Center' }, { 'id': 'PSENGR', 'text': 'PSENGR' }], 'taskTypes': [{ 'id': 'FIRST_FIRE', 'text': 'First Fire' }, { 'id': 'DEMOBILIZATION', 'text': 'DeMob/Punchlist' }] });
  constructor() {
  }

  errorSimulationOn = false;

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
    return new Observable((observer) => {
      observer.next(this._filterData(filter, returnType));
    });
  }
}


describe('ActionItem Component', () => {
  let component: ActionItemComponent;
  let commonService: CommonService;
  let permissions: NgxPermissionsService;
  let fixture: ComponentFixture<ActionItemComponent>;
  let actionItems;
 /*  const sideBar: SideBarComponent;
  const timeline: ActionItemTimelineComponent; */
  let mockCommonService: MockCommonService;
  const route = { params: new BehaviorSubject({ id: 63 }) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxPermissionsModule.forRoot(),
        HttpClientModule, SidebarModule, TooltipModule, DataTableModule,
        DataViewModule, FormsModule, ReactiveFormsModule, DropdownModule,
        GrowlModule,ProgressBarModule,CheckboxModule,
        ConfirmDialogModule,SidebarModule,MatBadgeModule,FileUploadModule,
        ToastrModule.forRoot({
          timeOut: 3000,
          preventDuplicates: true
        }), CalendarModule, BrowserAnimationsModule],
      declarations: [
        ActionItemComponent,
        TruncatePipe, SideBarComponent,
         ActionItemTimelineComponent,ItemAttachmentComponent,FilelengthPipe
        ], 
      providers: [CommonService, NgxPermissionsService,BroadcastService,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: ActivatedRoute, useValue: route }, DatePipe, ToastrService,ConfirmationService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ActionItemComponent);
    component = fixture.componentInstance;
    commonService = fixture.debugElement.injector.get(CommonService);
    permissions = fixture.debugElement.injector.get(NgxPermissionsService);
    permissions.addPermission('ROLE_WORKFLOW_CREATE');
    component.sideBar = fixture.componentInstance.sideBar;
    component.timeline = fixture.componentInstance.timeline;
    mockCommonService = new MockCommonService();
    actionItems = {'equipSerialNumber': '190T182', 'outageId': 13123, 'actionItemsList': [{'actionItemId': 60, 'itemTitle': 'Intial task for this workflow', 'dueDate': 1528956691.942000000, 'levelValue': 1, 'status': 'COMPLETE', 'category': 'START_UP_CHECKLIST', 'owner': 'FE', 'taskType': 'FIRST_FIRE', 'changeTracking': {'createdBy': {'sso': '502760963', 'firstName': 'Gouse', 'lastName': 'Mohammad'}, 'createdDate': 1528956691.942000000, 'modifiedBy': {'sso': '502760963', 'firstName': 'Gouse', 'lastName': 'Mohammad'}, 'modifiedDate': 1528956691.942000000}, 'workflowId': 63}]};
    spyOn(commonService, 'getAllActionItems').and.returnValue(Observable.of(actionItems));

    spyOn(commonService, 'filterCommonOptions').and.callFake(function (filter, returnType) {
      return mockCommonService.filterCommonOptions(filter, returnType);
    });

    spyOn(commonService, 'getAllActionItemNotes').and.returnValue(Observable.of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initalize the component', () => {
    expect(Array.from(component.categoryMap) as any).toContain(jasmine.arrayContaining(['TUNING', 'Tuning']));
    expect(Array.from(component.ownerMap) as any).toContain(jasmine.arrayContaining(['FE', 'FE']));
    expect(Array.from(component.taskMap) as any).toContain(jasmine.arrayContaining(['FIRST_FIRE', 'First Fire']));
  });

  it('should initalize the action items based on the workflowId', () => {
    const actionData = actionItems.actionItemsList;
    const esn = actionItems['equipSerialNumber'];
    const siteName = actionItems['siteName'];

    expect(component.actionData).toEqual(actionData);
    expect(component.esn).toEqual(esn);
    expect(component.siteName).toEqual(siteName);
  });

  it('should update the action items list when a new action item is added', () => {
    const formObject = { 'action': 'add', 'actionItemId': 60, 'itemTitle': 'New for data', 'dueDate': 1528137000000.000000000, 'event': false, 'levelValue': 0, 'status': 'COMPLETE', 'category': 'TUNING', 'owner': 'OPS_CENTER', 'taskType': 'DEMOBILIZATION', 'changeTracking': { 'createdBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'createdDate': 1529045236.328000000, 'modifiedBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'modifiedDate': 1529045236.328000000 }, 'workflowId': 63 };
    component.onHideSidebar(formObject);

    expect(component.actionData).toContain(jasmine.objectContaining(formObject));
    expect(component.visibleSidebar).toEqual(formObject.event);
  });

  it('should update the action item when it is updated', () => {
    const formObject = { 'action': 'edit', 'actionItemId': 60, 'itemTitle': 'New for data Updated', 'dueDate': 1528137000000.000000000, 'event': false, 'levelValue': 0, 'status': 'COMPLETE', 'category': 'TUNING', 'owner': 'OPS_CENTER', 'taskType': 'DEMOBILIZATION', 'changeTracking': { 'createdBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'createdDate': 1529045236.328000000, 'modifiedBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'modifiedDate': 1529045236.328000000 }, 'workflowId': 63 , 'uploadedFiles':[]};
    component.singleActionData = formObject;
    component.onHideSidebar(formObject);

    expect(component.actionData).toContain(jasmine.objectContaining(formObject));
    expect(component.visibleSidebar).toEqual(formObject.event);
  });

  it('should close the sidebar incase add/edit is passed', () => {
    const formObject = { 'action': '', 'actionItemId': 60, 'itemTitle': 'New for data Updated', 'dueDate': 1528137000000.000000000, 'event': false, 'levelValue': 0, 'status': 'COMPLETE', 'category': 'TUNING', 'owner': 'OPS_CENTER', 'taskType': 'DEMOBILIZATION', 'changeTracking': { 'createdBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'createdDate': 1529045236.328000000, 'modifiedBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'modifiedDate': 1529045236.328000000 }, 'workflowId': 63, 'uploadedFiles':[] };
    component.onHideSidebar(formObject);

    expect(component.visibleSidebar).toEqual(formObject.event);
  });

  it('should open the side if add button is clicked', () => {
    const formObject = { 'action': 'add', 'actionItemId': 60, 'itemTitle': 'New for data', 'dueDate': 1528137000000.000000000, 'event': false, 'levelValue': 0, 'status': 'COMPLETE', 'category': 'TUNING', 'owner': 'OPS_CENTER', 'taskType': 'DEMOBILIZATION', 'changeTracking': { 'createdBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'createdDate': 1529045236.328000000, 'modifiedBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'modifiedDate': 1529045236.328000000 }, 'workflowId': 63, 'uploadedFiles':[] };
    component.openSideBarComponent(new Event('click'), 'add', formObject);
    expect(component.sideBar.visibleSidebar).toBeTruthy();
    expect(component.sideBar.action).toEqual('add');
    expect(component.sideBar.formModel.workflowId).toEqual(63);
  });

  it('should open the side if edit button is clicked', () => {
    const formObject = { 'action': 'edit', 'actionItemId': 60, 'itemTitle': 'New for data', 'dueDate': 1528137000000.000000000, 'event': false, 'levelValue': 0, 'status': 'COMPLETE', 'category': 'TUNING', 'owner': 'OPS_CENTER', 'taskType': 'DEMOBILIZATION', 'changeTracking': { 'createdBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'createdDate': 1529045236.328000000, 'modifiedBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'modifiedDate': 1529045236.328000000 }, 'workflowId': 63, 'uploadedFiles':[] };
    component.openSideBarComponent(new Event('click'), 'edit', formObject);
    expect(component.sideBar.visibleSidebar).toBeTruthy();
    expect(component.sideBar.action).toEqual('edit');
    expect(component.sideBar.formModel.workflowId).toEqual(63);
  });


  it('should show the action timeline comment on click of an action item', () => {
    const formObject = { 'action': 'edit', 'actionItemId': 60, 'itemTitle': 'New for data', 'dueDate': 1528137000000.000000000, 'event': false, 'levelValue': 0, 'status': 'COMPLETE', 'category': 'TUNING', 'owner': 'OPS_CENTER', 'taskType': 'DEMOBILIZATION', 'changeTracking': { 'createdBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'createdDate': 1529045236.328000000, 'modifiedBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'modifiedDate': 1529045236.328000000 }, 'workflowId': 63, 'uploadedFiles':[] };
    component.setIndex(new Event('click'), 0, formObject);
    expect(component.selectedIndex).toEqual(0);
    expect(component.showBoxMessage).toBeTruthy();
    expect(component.singleActionData).toEqual(formObject);
  });


  it('should sort based on the fields', () => {
    const formObject = { 'action': 'edit', 'actionItemId': 60, 'itemTitle': 'New for data', 'dueDate': 1528137000000.000000000, 'event': false, 'levelValue': 0, 'status': 'COMPLETE', 'category': 'TUNING', 'owner': 'OPS_CENTER', 'taskType': 'DEMOBILIZATION', 'changeTracking': { 'createdBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'createdDate': 1529045236.328000000, 'modifiedBy': { 'sso': '503055897', 'firstName': 'Devendra', 'lastName': 'Tummala' }, 'modifiedDate': 1529045236.328000000 }, 'workflowId': 63, 'uploadedFiles':[] };
    component.onSortChange({ originalEvent: MouseEvent, value: 'category' });
    expect(component.sortField).toEqual('category');
    expect(component.sortOrder).toEqual(1);
  });


  it('should sort the item by status by having the status = NA at the end | ASCENDING', () => {
    component.actionData = [{ 'actionItemId': 1, 'itemTitle': 'Intial task for this workflow', 'dueDate': 1529490372.029000000, 'levelValue': 1, 'status': 'COMPLETE', 'category': 'START_UP_CHECKLIST', 'owner': 'FE', 'taskType': 'FIRST_FIRE', 'changeTracking': { 'createdBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'createdDate': 1529490372.029000000, 'modifiedBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'modifiedDate': 1529490372.029000000 }, 'workflowId': 1,'uploadedFiles':[] }, { 'actionItemId': 4, 'itemTitle': 'Adding another complete task', 'dueDate': 1529519400.000000000, 'levelValue': 0, 'status': 'COMPLETE', 'category': 'GENERATOR', 'owner': 'CONTROLS_REQ_ENGINEER', 'taskType': 'FIRST_FIRE', 'changeTracking': { 'createdBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'createdDate': 1529492590.074000000, 'modifiedBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'modifiedDate': 1529492590.074000000 }, 'workflowId': 1,'uploadedFiles':[] }, { 'actionItemId': 2, 'itemTitle': 'SIL Engineer has downloaded and reviewed the SIL Preliminary and Pre-requisites.', 'dueDate': 1344105000.000000000, 'levelValue': 355, 'status': 'IN_COMPLETE', 'category': 'COMPLIANCE_CHECKLIST', 'owner': 'SIL_ENGINEER', 'taskType': 'FIRST_FIRE', 'changeTracking': { 'createdBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'createdDate': 1529490372.030000000, 'modifiedBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'modifiedDate': 1529490372.030000000 }, 'workflowId': 1,'uploadedFiles':[] }, { 'actionItemId': 3, 'itemTitle': 'Adding NA item', 'dueDate': 1529346600.000000000, 'levelValue': 0, 'status': 'NA', 'category': 'GENERATOR', 'owner': 'OPS_CENTER', 'taskType': 'DEMOBILIZATION', 'changeTracking': { 'createdBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'createdDate': 1529492108.494000000, 'modifiedBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'modifiedDate': 1529492108.494000000 }, 'workflowId': 1,'uploadedFiles':[] }];
    component.sortByAscending = true;
    component.sortingActionItems({ sortField: 'status', sortOrder: '1' });
    expect(component.actionData[component.actionData.length - 1].status).toEqual('NA');
  });

  it('should sort the item by status by having the status = NA at the end | DESCENDING', () => {
    component.actionData = [{ 'actionItemId': 1, 'itemTitle': 'Intial task for this workflow', 'dueDate': 1529490372.029000000, 'levelValue': 1, 'status': 'COMPLETE', 'category': 'START_UP_CHECKLIST', 'owner': 'FE', 'taskType': 'FIRST_FIRE', 'changeTracking': { 'createdBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'createdDate': 1529490372.029000000, 'modifiedBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'modifiedDate': 1529490372.029000000 }, 'workflowId': 1,'uploadedFiles':[] }, { 'actionItemId': 4, 'itemTitle': 'Adding another complete task', 'dueDate': 1529519400.000000000, 'levelValue': 0, 'status': 'COMPLETE', 'category': 'GENERATOR', 'owner': 'CONTROLS_REQ_ENGINEER', 'taskType': 'FIRST_FIRE', 'changeTracking': { 'createdBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'createdDate': 1529492590.074000000, 'modifiedBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'modifiedDate': 1529492590.074000000 }, 'workflowId': 1,'uploadedFiles':[] }, { 'actionItemId': 2, 'itemTitle': 'SIL Engineer has downloaded and reviewed the SIL Preliminary and Pre-requisites.', 'dueDate': 1344105000.000000000, 'levelValue': 355, 'status': 'IN_COMPLETE', 'category': 'COMPLIANCE_CHECKLIST', 'owner': 'SIL_ENGINEER', 'taskType': 'FIRST_FIRE', 'changeTracking': { 'createdBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'createdDate': 1529490372.030000000, 'modifiedBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'modifiedDate': 1529490372.030000000 }, 'workflowId': 1,'uploadedFiles':[] }, { 'actionItemId': 3, 'itemTitle': 'Adding NA item', 'dueDate': 1529346600.000000000, 'levelValue': 0, 'status': 'NA', 'category': 'GENERATOR', 'owner': 'OPS_CENTER', 'taskType': 'DEMOBILIZATION', 'changeTracking': { 'createdBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'createdDate': 1529492108.494000000, 'modifiedBy': { 'sso': '503062340', 'firstName': 'Nitish', 'lastName': 'Saini' }, 'modifiedDate': 1529492108.494000000 }, 'workflowId': 1,'uploadedFiles':[] }];
    component.sortByAscending = false;
    component.sortingActionItems({ sortField: 'status', sortOrder: '1' });
    expect(component.actionData[component.actionData.length - 1].status).toEqual('NA');
  });








});
