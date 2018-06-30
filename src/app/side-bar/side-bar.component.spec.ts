import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {SidebarModule} from 'primeng/sidebar';
import {ResponseOptions, Response} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { DatePipe } from '@angular/common';

import {CommonService} from '../services/common.service';
import {BroadcastService} from '../services/broadcast.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {NgxPermissionsModule} from 'ngx-permissions';
import {CalendarModule} from 'primeng/calendar';

import {Observable} from 'rxjs/Observable';
import {BrowserModule} from '@angular/platform-browser';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BehaviorSubject} from 'rxjs';
import { SideBarComponent } from './side-bar.component';

class MockCommonService {
  commonData:  BehaviorSubject<{}> = new BehaviorSubject({
    'outageTypes': [
      {
        'id': 'CALL_OUT',
        'text': 'Call Out'
      },
      {
        'id': 'HGP',
        'text': 'HGP'
      },
      {
        'id': 'MI',
        'text': 'MI'
      },
      {
        'id': 'NA',
        'text': 'NA'
      },
      {
        'id': 'ONSITE_TRAINING',
        'text': 'On Site Training'
      },
      {
        'id': 'OTHER',
        'text': 'Other'
      },
      {
        'id': 'TDI',
        'text': 'TDI'
      },
      {
        'id': 'VALUE_PACK',
        'text': 'Value Pack'
      },
      {
        'id': 'WARRANTY',
        'text': 'Warranty'
      }
    ],
    'categories': [
      {
        'id': 'START_UP_CHECKLIST',
        'text': 'Start-Up Checklist'
      },
      {
        'id': 'TUNING',
        'text': 'Tuning'
      },
      {
        'id': 'GENERATOR',
        'text': 'Generator'
      },
      {
        'id': 'CLEANLINESS',
        'text': 'Cleanliness'
      },
      {
        'id': 'COMPLIANCE_CHECKLIST',
        'text': 'Compliance Checklist'
      },
      {
        'id': 'MD_CENTER',
        'text': 'MD Center'
      },
      {
        'id': 'AUDITS_COMM_PROCEDURES',
        'text': 'Audits and Comissioning Procedures'
      },
      {
        'id': 'SITE_DEMOBILIZATION',
        'text': 'Site Demobilization'
      },
      {
        'id': 'TUNING_KIT',
        'text': 'Tuning Kit'
      }
    ],
    'status': [
      {
        'id': 'COMPLETE',
        'text': 'Complete'
      },
      {
        'id': 'IN_COMPLETE',
        'text': 'In Complete'
      },
      {
        'id': 'NA',
        'text': 'NA'
      }
    ],
    'owner': [
      {
        'id': 'FE',
        'text': 'FE'
      },
      {
        'id': 'CONTROLS_REQ_ENGINEER',
        'text': 'Controls Req Engr'
      },
      {
        'id': 'IRFR_ADMIN',
        'text': 'IRFR Admin'
      },
      {
        'id': 'OPS_CENTER',
        'text': 'Ops Center'
      },
      {
        'id': 'PSENGR',
        'text': 'PSENGR'
      }
    ],
    'taskTypes': [
      {
        'id': 'FIRST_FIRE',
        'text': 'First Fire'
      },
      {
        'id': 'DEMOBILIZATION',
        'text': 'DeMob/Punchlist'
      }
    ]
  });
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

  createActionItem(workflowId, formValue): any {
    return new Observable((observer) => {
      if (this.errorSimulationOn) {
        const errorResp = new HttpErrorResponse({
          status: 404,
          error: '404'
        });

        observer.error(errorResp);
      } else {
        const resp = {
          'actionItemId': 17,
          'itemTitle': 'New action items for submit',
          'dueDate': 1528828200000.000000000,
          'levelValue': 0,
          'status': 'COMPLETE',
          'category': 'TUNING',
          'owner': 'CONTROLS_REQ_ENGINEER',
          'taskType': 'FIRST_FIRE',
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528778416.629000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528778416.629000000
          },
          'outageId': 12312,
          'equipSerialNum': '190T182'
        };
        observer.next(resp);
      }
    });
  }

  updateActionItem(actionItemId, formValue): any {
    return new Observable((observer) => {
      if (this.errorSimulationOn) {
        const errorResp =  new HttpErrorResponse({
          status: 404,
          error: '404'
        });
        observer.error(errorResp);
      } else {
        const resp = {
          'actionItemId': 17,
          'itemTitle': 'New action items for submit',
          'dueDate': 1528828200000.000000000,
          'levelValue': 0,
          'status': 'COMPLETE',
          'category': 'TUNING',
          'owner': 'CONTROLS_REQ_ENGINEER',
          'taskType': 'FIRST_FIRE',
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528778416.629000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528778416.629000000
          },
          'outageId': 12312,
          'equipSerialNum': '190T182'
        };
        observer.next(resp);
      }
    });
  }
}

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let commonService: CommonService;
  let mockCommonService: MockCommonService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  let toastr: ToastrService;
  const route = {url: new BehaviorSubject([{path: 'createWorkflow'}]), params: new BehaviorSubject({id: 1})};
  let sideBarClose;
  let widgetOverlay;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarComponent ],

      imports: [BrowserModule, FormsModule,
        HttpClientModule, NgxPermissionsModule.forRoot(),
        AutoCompleteModule, ToastrModule.forRoot({
          timeOut: 3000,
          preventDuplicates: true
        }), BrowserAnimationsModule, ReactiveFormsModule,
        CalendarModule
       ],

        providers: [BroadcastService,
          CommonService,
          ToastrService,
          {provide: APP_BASE_HREF, useValue: '/'},
          {provide: ActivatedRoute, useValue: route},
          {provide: Router, useValue: router},
          DatePipe
        ],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.ngAfterViewChecked();
    commonService = fixture.debugElement.injector.get(CommonService);
    toastr = fixture.debugElement.injector.get(ToastrService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    sideBarClose = document.createElement('div');
    sideBarClose.setAttribute('class', 'ui-sidebar-close');
    document.body.appendChild(sideBarClose);
    widgetOverlay = document.createElement('div');
    widgetOverlay.setAttribute('class', 'ui-widget-overlay');
    document.body.appendChild(widgetOverlay);
    this.closeElem = document.querySelector('.ui-sidebar-close');
    this.overlayEle =  document.querySelector('.ui-widget-overlay');

    mockCommonService = new MockCommonService();
    spyOn(commonService, 'filterCommonOptions').and.callFake(function(filter, returnType) {
      return mockCommonService.filterCommonOptions(filter, returnType);
    });
    spyOn(commonService, 'createActionItem').and.callFake(function(workflowId, formValue) {
      return mockCommonService.createActionItem(workflowId, formValue);
    });
    spyOn(commonService, 'updateActionItem').and.callFake(function(actionItemId, formValue) {
      return mockCommonService.updateActionItem(actionItemId, formValue);
    });
  });

  afterEach(() => {
    sideBarClose.parentNode.removeChild(sideBarClose);
    widgetOverlay.parentNode.removeChild(widgetOverlay);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the side bar in add mode', () => {
    component.action = 'add';
    component.formModel = {};
    component.visibleSidebar = true;
    component.openSideBar();
    expect(component.ownerOptions).toContain(jasmine.objectContaining({'key': 'FE', 'value': 'FE'}));
    expect(component.categoryOptions).toContain(jasmine.objectContaining({'key': 'TUNING', 'value': 'Tuning'}));
    expect(component.statusOptions).toContain(jasmine.objectContaining({'key': 'COMPLETE', 'value': 'Complete'}));
    expect(component.typeOptions).toContain(jasmine.objectContaining({'key': 'FIRST_FIRE', 'value': 'First Fire'}));
  });

  it('should open the side bar in edit mode', () => {
    component.action = 'edit';
    component.formModel = {
      'actionItemId': 1,
      'itemTitle': 'Intial task for this workflow',
      'dueDate': 1528711454.319,
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
        'createdDate': 1528711454.319,
        'modifiedBy': {
          'sso': '503055897',
          'firstName': 'Devendra',
          'lastName': 'Tummala'
        },
        'modifiedDate': 1528711454.319
      },
      'outageId': 12312,
      'equipSerialNum': '190T182'
    };
    component.visibleSidebar = true;
    component.openSideBar();
    expect(component.form.controls.itemTitle.value).toEqual(component.formModel.itemTitle);
    expect(component.form.controls.category.value).toEqual(component.formModel.category);
    expect(component.form.controls.owner.value).toEqual(component.formModel.owner);
    expect(component.form.controls.taskType.value).toEqual(component.formModel.taskType);
    expect(component.form.controls.status.value).toEqual(component.formModel.status);
  });

  it('should add a new action item on submit', () => {
    component.action = 'add';
    component.formModel = {
      'itemTitle': 'New action items for submit',
      'dueDate': 1528828200000,
      'category': 'TUNING',
      'owner': 'CONTROLS_REQ_ENGINEER',
      'taskType': 'FIRST_FIRE',
      'status': 'COMPLETE'
    };
    component.visibleSidebar = true;
    component.form.controls.itemTitle.setValue(component.formModel.itemTitle);
    component.form.controls.category.setValue(component.formModel.category);
    component.form.controls.dueDate.setValue(new Date(component.formModel.dueDate));
    component.form.controls.owner.setValue(component.formModel.owner);
    component.form.controls.taskType.setValue(component.formModel.taskType);
    component.form.controls.status.setValue(component.formModel.status);

    component.openSideBar();
    expect(component.form.valid).toBeTruthy();
    component.onSubmit(component.action);
    expect(toastr.previousToastMessage).toEqual('Success');
  });

  it('should edit an item on submit', () => {
    component.action = 'edit';
    component.formModel = {
      'itemTitle': 'New action items for submit',
      'dueDate': 1528828200000,
      'category': 'TUNING',
      'owner': 'CONTROLS_REQ_ENGINEER',
      'taskType': 'FIRST_FIRE',
      'status': 'COMPLETE'
    };
    component.visibleSidebar = true;
    component.openSideBar();
    expect(component.form.valid).toBeTruthy();

    component.onSubmit(component.action);
    expect(toastr.previousToastMessage).toEqual('Success');
  });

  it('should give  error on edit an item', () => {
    mockCommonService.errorSimulationOn = true;
    component.action = 'edit';
    component.formModel = {
      'itemTitle': 'New action items for submit',
      'dueDate': 1528828200000,
      'category': 'TUNING',
      'owner': 'CONTROLS_REQ_ENGINEER',
      'taskType': 'FIRST_FIRE',
      'status': 'COMPLETE'
    };
    component.visibleSidebar = true;
    component.openSideBar();
    expect(component.form.valid).toBeTruthy();

    component.onSubmit(component.action);
    expect(toastr.previousToastMessage).toEqual('Error');
    mockCommonService.errorSimulationOn = false;
  });

  it('should give error on add an item', () => {
    mockCommonService.errorSimulationOn = true;
    component.action = 'add';
    component.formModel = {
      'itemTitle': 'New action items for submit',
      'dueDate': 1528828200000,
      'category': 'TUNING',
      'owner': 'CONTROLS_REQ_ENGINEER',
      'taskType': 'FIRST_FIRE',
      'status': 'COMPLETE'
    };
    component.visibleSidebar = true;
    component.openSideBar();
    component.form.controls.itemTitle.setValue(component.formModel.itemTitle);
    component.form.controls.category.setValue(component.formModel.category);
    component.form.controls.dueDate.setValue(new Date(component.formModel.dueDate));
    component.form.controls.owner.setValue(component.formModel.owner);
    component.form.controls.taskType.setValue(component.formModel.taskType);
    component.form.controls.status.setValue(component.formModel.status);
    expect(component.form.valid).toBeTruthy();

    component.onSubmit(component.action);
    expect(toastr.previousToastMessage).toEqual('Error');
    mockCommonService.errorSimulationOn = false;
  });





});
