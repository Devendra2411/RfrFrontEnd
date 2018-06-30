import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {CreateWorkflowComponent} from './create-workflow.component';
import {FormsModule, ReactiveFormsModule, NgForm} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, Component, DebugElement} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {APP_BASE_HREF, DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {CommonService} from '../services/common.service';
import {BroadcastService} from '../services/broadcast.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {NgxPermissionsModule, NgxPermissionsService} from 'ngx-permissions';

import {Observable} from 'rxjs/Observable';
import {BrowserModule} from '@angular/platform-browser';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { TooltipModule } from 'primeng/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BehaviorSubject} from 'rxjs';
import { Workflow } from '../common/classes/common-objects';



describe('CreateWorkflowComponent edit mode', () => {
  let component: CreateWorkflowComponent;
  let fixture: ComponentFixture<CreateWorkflowComponent>;
  let commonService: CommonService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  let toastr;
  const route = {params: new BehaviorSubject({})};
  let siteList: any;
  let permissionService: NgxPermissionsService;
  let respOfUpdated: Workflow;
  const createWorkflow = false;
  route.params.next({id: 1});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TooltipModule,
        HttpClientModule,  NgxPermissionsModule.forRoot(), AutoCompleteModule, ToastrModule.forRoot({
          timeOut: 3000,
          preventDuplicates: true
        }), FormsModule, ReactiveFormsModule,  BrowserAnimationsModule],
        declarations: [CreateWorkflowComponent],
      providers: [BroadcastService,
        CommonService,
        ToastrService, NgxPermissionsService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: ActivatedRoute, useValue: route},
        {provide: Router, useValue: router}, DatePipe
      ], schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkflowComponent);
    component = fixture.componentInstance;
    commonService = fixture.debugElement.injector.get(CommonService);
    toastr = fixture.debugElement.injector.get(ToastrService);
    permissionService = fixture.debugElement.injector.get(NgxPermissionsService);
    siteList =  [{'siteName': 'Test_Site'}, {'siteName': 'Test_Site2'}]  ;
    spyOn(commonService, 'getSiteNames').and.returnValue(Observable.from([siteList]));
    spyOn(component, '_hasAccess').and.callFake(function(permissions, access: string) {
      const permissionList = Object.keys(permissions);
    return (permissionList.indexOf(access) !== -1) ? true : false;
    });
    fixture.detectChanges();
    respOfUpdated = <Workflow>{
      'workflowId': 1,
      'trainId' : 1,
      'workflowName' : 'test',
      'equipSerialNumber': '190T182',
      'siteName': 'Test_Site',
      'outageId': 13123,
      'assignedEngineers': [
        {
          'sso': '503055888',
          'firstName': 'Shilpa',
          'lastName': 'Kuntla',
          'emailId': '',
          name: ''
        },
        {
          'sso': '503055886',
          'firstName': 'Priyanka',
          'lastName': 'Sharma'
        }
      ],
      'actionItems': [
        {
          'actionItemId': 1,
          'itemTitle': 'Intial task for this workflow',
          'dueDate': 1528292742.490000000,
          'levelValue': 1,
          'status': 'COMPLETE',
          'category': 'START_UP_CHECKLIST',
          'owner': 'FE',
          'taskType': 'FIRST_FIRE',
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528292742.490000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528292742.490000000
          }
        },
        {
          'actionItemId': 2,
          'itemTitle': 'Task Created for Action Item1',
          'dueDate': 1528199623.978000000,
          'levelValue': 2,
          'status': 'NA',
          'category': 'START_UP_CHECKLIST',
          'owner': 'FE',
          'taskType': 'FIRST_FIRE',
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528292765.852000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528292765.852000000
          }
        }
      ]
    };

    spyOn(commonService, 'getRfrWorkflow').and.returnValue(Observable.from([respOfUpdated]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Check ngOninit with Create Access and Editing Existing Workflow', () => {
    permissionService.addPermission('ROLE_WORKFLOW_CREATE');
    component.ngOnInit();
    expect(component.routeSelected).toEqual('edit');
    expect(component.actionTitle).toEqual('Edit');
    expect(component.editTrainId).toEqual(respOfUpdated.trainId);
    expect(component.editOutage).toEqual(respOfUpdated.outageId);
  });



  it('should Check ngOninit with View Access', () => {
    permissionService.addPermission('ROLE_WORKFLOW_VIEW');
    component.ngOnInit();
    expect(component.routeSelected).toEqual('view');
    expect(component.actionTitle).toEqual('View');
    expect(component.editTrainId).toEqual(respOfUpdated.trainId);
    expect(component.editOutage).toEqual(respOfUpdated.outageId);
  });



  it(`should Check _hasAccess when has Role 'ROLE_WORKFLOW_CREATE'`, () => {
    const permissions = {
      'ROLE_PHONE_CALL_VIEW': {
        'name': 'ROLE_PHONE_CALL_VIEW'
      },
      'ROLE_WORKFLOW_VIEW': {
        'name': 'ROLE_WORKFLOW_VIEW'
      },
      'ROLE_PHONE_CALL_CREATE': {
        'name': 'ROLE_PHONE_CALL_CREATE'
      },
      'ROLE_RFR_ADMIN': {
        'name': 'ROLE_RFR_ADMIN'
      },
      'ROLE_WORKFLOW_CREATE': {
        'name': 'ROLE_WORKFLOW_CREATE'
      },
      'ROLE_RFR_TEAM_MEMBER': {
        'name': 'ROLE_RFR_TEAM_MEMBER'
      }
    };
    const hasCreateAccess: boolean = component._hasAccess(permissions, 'ROLE_WORKFLOW_CREATE');
    expect(hasCreateAccess).toEqual(true);
  });
  it(`should Check _hasAccess when has No Role 'ROLE_WORKFLOW_CREATE' and has role 'ROLE_WORKFLOW_VIEW'`, () => {
    const permissions = {
      'ROLE_PHONE_CALL_VIEW': {
        'name': 'ROLE_PHONE_CALL_VIEW'
      },
      'ROLE_WORKFLOW_VIEW': {
        'name': 'ROLE_WORKFLOW_VIEW'
      },
      'ROLE_PHONE_CALL_CREATE': {
        'name': 'ROLE_PHONE_CALL_CREATE'
      },
      'ROLE_RFR_ADMIN': {
        'name': 'ROLE_RFR_ADMIN'
      },
      'ROLE_WORKFLOW_CREATE': {
        'name': 'ROLE_WORKFLOW_CREATE'
      },
      'ROLE_RFR_TEAM_MEMBER': {
        'name': 'ROLE_RFR_TEAM_MEMBER'
      }
    };
    const hasViewAccess: boolean = component._hasAccess(permissions, 'ROLE_WORKFLOW_VIEW');
    expect(hasViewAccess).toEqual(true);
  });

  it(`should Check _hasAccess when it does not has Role 'ROLE_WORKFLOW_CREATE'`, () => {
    const permissions = {
      'ROLE_PHONE_CALL_VIEW': {
        'name': 'ROLE_PHONE_CALL_VIEW'
      },
      'ROLE_WORKFLOW_VIEW': {
        'name': 'ROLE_WORKFLOW_VIEW'
      },
      'ROLE_PHONE_CALL_CREATE': {
        'name': 'ROLE_PHONE_CALL_CREATE'
      },
      'ROLE_RFR_ADMIN': {
        'name': 'ROLE_RFR_ADMIN'
      },
      'ROLE_RFR_TEAM_MEMBER': {
        'name': 'ROLE_RFR_TEAM_MEMBER'
      }
    };
    const hasCreateAccess: boolean = component._hasAccess(permissions, 'ROLE_WORKFLOW_CREATE');
    expect(hasCreateAccess).toEqual(false);
  });

  it('should verify getSiteNames', () => {
    component.getSiteNames();
    expect(component.siteNames).toEqual(siteList);
  });

  it('should verify filterSite with ESNList length >0', () => {
    const event = {query: 'Test'};
    const filteredList1 = [{'equipSerialNumber': '190T182', 'siteName': 'Test_Site'}, {
      'equipSerialNumber': '190T182',
      'siteName': 'Test_Site'
    }];
    const filteredList2 =  [{'equipSerialNumber': '270T272', 'siteName': 'Test_Site'}];
    component.siteNames =  [{'siteName': 'Test_Site'}, {'siteName': 'Test_Site2'}] ;
    component.filterSite(event);
    expect(component.siteSuggestedList['siteName']).toEqual(filteredList2['siteName']);
  });
  it('should verify filterSite with ESNList length=0', () => {
    const event = {query: 'Test_Site'};
    component.siteNames = [];
    component.filterSite(event);
    expect(component.siteSuggestedList.length).toEqual(0);
  });

   it('should verify getOutagesForEsn', () => {
    const site = { 'siteName': 'Test_Site' };
    const siteResponse = [{'trainId': 49, 'esnAndOutagesList': [{'equipSerialNumber': '2901ML', 'outagesList': [500]}, {'equipSerialNumber': '2901GL', 'outagesList': [499, 501]}], 'unitName': '', 'toggle': true, 'toggleSelected': true, 'outageSelected': ''}, {'trainId': 22, 'esnAndOutagesList': [{'equipSerialNumber': '29017L', 'outagesList': [225]}], 'unitName': '', 'toggle': true, 'toggleSelected': true, 'outageSelected': ''}, {'trainId': 50, 'esnAndOutagesList': [{'equipSerialNumber': '2901BM', 'outagesList': [513]}], 'unitName': '', 'toggle': true, 'toggleSelected': true, 'outageSelected': ''}];
     spyOn(commonService, 'getOutageESNDetails').and.returnValue(Observable.from([siteResponse]));
    component.getOutagesForEsn('Test_Site');
  //  expect(component.trainAndEsn).toEqual(outageList2);
  });

  it('should verify filterOutageId with OutageId length >0', () => {
    const event = {query: '5'};
    const obj = ['500'];
    component.filterOutageID(event, obj);
    expect(component.outageSuggestedList.length).toBeGreaterThan(0);
  });

  it('should verify single toggle in outage list', () => {
    expect(component.isSingleToggle).toEqual(false);
    component.trainAndEsn = [{'trainId': 49, 'esnAndOutagesList': [{'equipSerialNumber': '2901ML', 'outagesList': [500]}, {'equipSerialNumber': '2901GL', 'outagesList': [499, 501]}], 'unitName': '', 'toggle': true, 'toggleSelected': true, 'outageSelected': ''}, {'trainId': 22, 'esnAndOutagesList': [{'equipSerialNumber': '29017L', 'outagesList': [225]}], 'unitName': '', 'toggle': true, 'toggleSelected': true, 'outageSelected': ''}, {'trainId': 50, 'esnAndOutagesList': [{'equipSerialNumber': '2901BM', 'outagesList': [513]}], 'unitName': '', 'toggle': true, 'toggleSelected': true, 'outageSelected': ''}];
    component.checkSingletoggle();
    expect(component.isSingleToggle).toEqual(false);
  });

  it('should verify searchSSO where query length <5', () => {
    const event = {query: '503055'};
    const ssoList = [];
  });


  it('should verify searchSSO where query length >5', fakeAsync(() => {
    const event = {query: '503055897'};
    const ssoList: any[] = [{ssoId: '503055897', firstName: 'Devendra', lastName: 'Tummala', emailId: 'Devendra.Tummala@ge.com'}];
    spyOn(commonService, 'getSSOUsers').and.returnValue(Observable.from([ssoList]));
    component.searchSSO(event);
    tick(1500);
    expect(component.results.length).toEqual(1);
  }));

  it('should verify searchSSO where query length <5', () => {
    const event = {query: '5030'};
    const ssoList: any[] = [];
    component.searchSSO(event);
    expect(component.results.length).toEqual(0);
  });

 it('should verify createRFRWorkflow when creating New Workflow', () => {
    component.workflowForm = <NgForm>{valid: true};
    component.routeSelected = 'create';
    component.siteNameSelected  =  'Test_Site';
    component.outageSelected = {outageId: '1'};
    component.searchText = [{
      'sso': '503055897',
      'firstName': 'Devendra',
      'lastName': 'Tummala',
      'emailId': 'Devendra.Tummala@ge.com',
      'name': 'Devendra Tummala'
    }];
    const respForCreated = {equipSerialNumber: '270T272', siteName: 'Test_Site', outageId: '1', workflowId: 1};
    const respSucessMsg = 'RFR Workflow Created';
    component.trainAndEsn = [{'trainId': 49, 'esnAndOutagesList': [{'equipSerialNumber': '2901ML', 'outagesList': [500]}, {'equipSerialNumber': '2901GL', 'outagesList': [499, 501]}], 'unitName': '', 'toggle': true, 'toggleSelected': true, 'outageSelected': ''}, {'trainId': 22, 'esnAndOutagesList': [{'equipSerialNumber': '29017L', 'outagesList': [225]}], 'unitName': '', 'toggle': true, 'toggleSelected': true, 'outageSelected': ''}, {'trainId': 50, 'esnAndOutagesList': [{'equipSerialNumber': '2901BM', 'outagesList': [513]}], 'unitName': '', 'toggle': true, 'toggleSelected': true, 'outageSelected': ''}];
    spyOn(commonService, 'createRfrWorkflow').and.returnValue(Observable.from([respForCreated]));
    component.createRFRWorkflow();
    expect(toastr.previousToastMessage).toEqual(respSucessMsg);
  });

   it('should verify createRFRWorkflow when editing existing Workflow', () => {
    component.workflowForm = <NgForm>{valid: true};
    component.routeSelected = 'edit';
    component.siteNameSelected  =  'Test_Site';
    component.searchText = [{
      'sso': '503055897',
      'firstName': 'Devendra',
      'lastName': 'Tummala',
      'emailId': 'Devendra.Tummala@ge.com',
      'name': 'Devendra Tummala'
    }];
    const reqForEdited = { trainId: '1' ,
            workflowName: 'test',
            equipSerialNumber: '270T272',
             siteName: 'Test_Site2',
             outageId: '1',
              workflowId: 1};
    component.workflowId = reqForEdited.workflowId;
    const respForEdited = {
               trainId: '1' ,
                workflowName: 'test',
                 equipSerialNumber: '270T272', siteName: 'Test_Site2', outageId: '1', workflowId: 1};
    component.trainAndEsn = [{'trainId': 49, 'esnAndOutagesList': [{'equipSerialNumber': '2901ML', 'outagesList': [500]}, {'equipSerialNumber': '2901GL', 'outagesList': [499, 501]}], 'unitName': '', 'toggle': true, 'toggleSelected': true, 'outageSelected': ''}, {'trainId': 22, 'esnAndOutagesList': [{'equipSerialNumber': '29017L', 'outagesList': [225]}], 'unitName': '', 'toggle': true, 'toggleSelected': true, 'outageSelected': ''}, {'trainId': 50, 'esnAndOutagesList': [{'equipSerialNumber': '2901BM', 'outagesList': [513]}], 'unitName': '', 'toggle': true, 'toggleSelected': true, 'outageSelected': ''}];
    spyOn(commonService, 'updateRfrWorkflow').and.returnValue(Observable.from([respForEdited]));
    component.createRFRWorkflow();
    expect(toastr.previousToastMessage).toEqual('RFR Workflow has been updated');
  });

  it('should verify _updateForm', () => {
    component.workflowForm = <NgForm>{valid: true};
    component.routeSelected = 'edit';
    const outageSelected = {outageId: 13123 };
    const searchText = [{
      'ssoId': '503055897',
      'firstName': 'Devendra',
      'lastName': 'Tummala',
      'emailId': 'Devendra.Tummala@ge.com',
      'name': 'Devendra Tummala'
    }];
    const req = {workflowId: 1};
    component._updateForm(req.workflowId);
    expect(component.editOutage).toEqual(outageSelected.outageId);
  });
});


describe('CreateWorkflowComponent create mode', () => {
  let component: CreateWorkflowComponent;
  let fixture: ComponentFixture<CreateWorkflowComponent>;
  let commonService: CommonService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  let toastr;
  const route = {params: new BehaviorSubject({})};
  let siteList: any;
  let permissionService: NgxPermissionsService;
  let respOfUpdated: Workflow;
  const createWorkflow = false;
  route.params.next({});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateWorkflowComponent],
      imports: [FormsModule,
        HttpClientModule, NgxPermissionsModule.forRoot(), AutoCompleteModule, ToastrModule.forRoot({
          timeOut: 3000,
          preventDuplicates: true
        }), BrowserAnimationsModule],
      providers: [BroadcastService,
        CommonService,
        ToastrService, NgxPermissionsService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: ActivatedRoute, useValue: route},
        {provide: Router, useValue: router}, DatePipe
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkflowComponent);
    component = fixture.componentInstance;
    commonService = fixture.debugElement.injector.get(CommonService);
    toastr = fixture.debugElement.injector.get(ToastrService);
    permissionService = fixture.debugElement.injector.get(NgxPermissionsService);

    siteList =  [{'siteName': 'Test_Site'}, {'siteName': 'Test_Site2'}]  ;
    spyOn(commonService, 'getSiteNames').and.returnValue(Observable.from([siteList]));
    spyOn(component, '_hasAccess').and.callFake(function(permissions, access: string) {
      const permissionList = Object.keys(permissions);
    return (permissionList.indexOf(access) !== -1) ? true : false;
    });
    respOfUpdated = <Workflow>{
      'workflowId': 1,
      'trainId' : 1,
      'workflowName' : 'test',
      'equipSerialNumber': '2901ML',
      'siteName': 'Test_Site',
      'outageId': 500,
      'assignedEngineers': [
        {
          'sso': '503055888',
          'firstName': 'Shilpa',
          'lastName': 'Kuntla',
          'emailId': '',
          name: ''
        },
        {
          'sso': '503055886',
          'firstName': 'Priyanka',
          'lastName': 'Sharma'
        }
      ],
      'actionItems': [
        {
          'actionItemId': 1,
          'itemTitle': 'Intial task for this workflow',
          'dueDate': 1528292742.490000000,
          'levelValue': 1,
          'status': 'COMPLETE',
          'category': 'START_UP_CHECKLIST',
          'owner': 'FE',
          'taskType': 'FIRST_FIRE',
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528292742.490000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528292742.490000000
          }
        },
        {
          'actionItemId': 2,
          'itemTitle': 'Task Created for Action Item1',
          'dueDate': 1528199623.978000000,
          'levelValue': 2,
          'status': 'NA',
          'category': 'START_UP_CHECKLIST',
          'owner': 'FE',
          'taskType': 'FIRST_FIRE',
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528292765.852000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528292765.852000000
          }
        }
      ]
    };

    spyOn(commonService, 'getRfrWorkflow').and.returnValue(Observable.from([respOfUpdated]));
  });

});
