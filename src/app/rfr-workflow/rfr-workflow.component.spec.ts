import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {APP_BASE_HREF, DatePipe} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {routing} from '../app.routing';
import {By} from '@angular/platform-browser';

import {NgxPermissionsModule} from 'ngx-permissions';
import {MultiSelectModule} from 'primeng/multiselect';
import {RFRWorkflowComponent} from './rfr-workflow.component';
import {DataTablesModule} from 'angular-datatables';
import {CommonService} from '../services/common.service';
import {MatButtonModule} from '@angular/material/button';
import {TableModule} from 'primeng/table';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextModule} from 'primeng/inputtext';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CreateWorkflowComponent} from '../create-workflow/create-workflow.component';
import {NoPermissionComponent} from '../no-permission/no-permission.component';
import {RfrHttpInterceptor} from '../rfr-http-interceptor';
import {BroadcastService} from '../services/broadcast.service';
import {Observable} from 'rxjs/observable';
import { ActionItemComponent } from '../action-item/action-item.component';
import { PhoneMeetingsComponent } from '../phone-meetings/phone-meetings.component';
import { PhoneCallMinutesComponent } from '../phone-call-minutes/phone-call-minutes.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import {TooltipModule} from 'primeng/tooltip';
import {TruncatePipe} from '../pipes/truncate.pipe';
import { truncate } from 'fs';

describe('RFRWorkflowComponent', () => {
  let component: RFRWorkflowComponent;
  let fixture: ComponentFixture<RFRWorkflowComponent>;
  let element: HTMLElement;
  let commonService: CommonService;
  let data: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RFRWorkflowComponent,
        CreateWorkflowComponent,
        NoPermissionComponent,
        ActionItemComponent,
        PhoneMeetingsComponent,
        PhoneCallMinutesComponent,
        PageNotFoundComponent,
        TruncatePipe
      ],
      imports: [
        MatButtonModule, DataTablesModule, NgxPermissionsModule.forRoot(), MultiSelectModule,
        TableModule, AutoCompleteModule, InputTextModule, routing, FormsModule, ReactiveFormsModule, RouterTestingModule,
        HttpClientModule, BrowserAnimationsModule, TooltipModule
      ],
      providers: [CommonService, BroadcastService, {provide: APP_BASE_HREF, useValue: '/'},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RfrHttpInterceptor,
          multi: true
        }, DatePipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RFRWorkflowComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    commonService = fixture.debugElement.injector.get(CommonService);

    data = [
      {
        'workflowId': 27,
        'equipSerialNumber': '2901ML',
        'outageId': 500,
        'siteName': 'Test_Site',
        'outageProbability': 'PLANNED',
        'outageType': 'HGP',
        'technicalCode': 'AERO_GAS',
        'contractType': 'MMP',
        'projectStatus': 'CLOSED',
        'eventStatus': 'CLOSED',
        'eStartDate': 1344191400.000000000,
        'eEndDate': 1344191400.000000000,
        'eUnitStartupDate': 1344191400.000000000,
        'region': 'INDIA',
        'changeTracking': {
          'createdBy': {
            'sso': 'Devendra',
            'firstName': '503055897',
            'lastName': 'Tummala'
          },
          'createdDate': 1344191400.000000000,
          'modifiedBy': {
            'sso': 'Devendra',
            'firstName': '503055897',
            'lastName': 'Tummala'
          },
          'modifiedDate': 1344191400.000000000
        }
      },
      {
        'workflowId': 28,
        'equipSerialNumber': '2901GL',
        'outageId': 499,
        'siteName': 'Test_Site',
        'outageProbability': 'PLANNED',
        'outageType': 'HGP',
        'technicalCode': 'AERO_GAS',
        'contractType': 'MMP',
        'projectStatus': 'CLOSED',
        'eventStatus': 'CLOSED',
        'eStartDate': 1344191400.000000000,
        'eEndDate': 1344191400.000000000,
        'eUnitStartupDate': 1344191400.000000000,
        'region': 'INDIA',
        'changeTracking': {
          'createdBy': {
            'sso': 'Devendra',
            'firstName': '503055897',
            'lastName': 'Tummala'
          },
          'createdDate': 1344191400.000000000,
          'modifiedBy': {
            'sso': 'Devendra',
            'firstName': '503055897',
            'lastName': 'Tummala'
          },
          'modifiedDate': 1344191400.000000000
        }
      },
      {
        'workflowId': 32,
        'equipSerialNumber': '29037G',
        'outageId': 480,
        'siteName': 'Test_Site2',
        'outageProbability': 'PLANNED',
        'outageType': 'HGP',
        'technicalCode': 'AERO_GAS',
        'contractType': 'MMP',
        'projectStatus': 'CLOSED',
        'eventStatus': 'CLOSED',
        'eStartDate': 1344191400.000000000,
        'eEndDate': 1344191400.000000000,
        'eUnitStartupDate': 1344191400.000000000,
        'region': 'INDIA',
        'changeTracking': {
          'createdBy': {
            'sso': 'Devendra',
            'firstName': '503055897',
            'lastName': 'Tummala'
          },
          'createdDate': 1344191400.000000000,
          'modifiedBy': {
            'sso': 'Devendra',
            'firstName': '503055897',
            'lastName': 'Tummala'
          },
          'modifiedDate': 1344191400.000000000
        }
      }
      ];

    spyOn(commonService, 'getRFRProjects').and.returnValue(Observable.from([data]));

    spyOn(commonService, 'filterCommonOptions').and.callFake(function(filter, returnType) {
      const options  = [
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
      ];
      let tempOption;
      if (returnType === 'MAP') {
        tempOption = new Map<string, string>();
        for (const [key, value] of Object.entries(options)) {
          tempOption.set(value['id'], value['text']);
        }
      } else if (returnType === 'ARRAY') {
        tempOption = [];
        for (const [key, value] of Object.entries(options)) {
          const tempObj = Object.create(null);
          tempObj['key'] = value['id'];
          tempObj['value'] = value['text'];
          tempOption.push(tempObj);
        }
      }

      return new Observable((observer) => {
        observer.next(tempOption);
      });
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return getWorkflowDetails', () => {
    component.getWorkflowDetails();
    expect(component.projectsData).toEqual(data);
  });
});
