import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCallMinutesComponent } from './phone-call-minutes.component';
import { FormsModule, NgForm, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonService } from '../services/common.service';
import { EditorModule } from 'primeng/editor';
import { CalendarModule } from 'primeng/primeng';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('PhoneCallMinutesComponent', () => {
  let component: PhoneCallMinutesComponent;
  let fixture: ComponentFixture<PhoneCallMinutesComponent>;
  let commonService: CommonService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  let toastr: ToastrService;
  const route = {params: new BehaviorSubject({}), queryParams: new BehaviorSubject({})};
  route.params.next({id: 1});
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneCallMinutesComponent ],
      imports: [FormsModule, EditorModule, CalendarModule, ReactiveFormsModule,
        NgxPermissionsModule.forRoot(), ToastrModule.forRoot({
          timeOut: 3000,
          preventDuplicates: true
        }), HttpClientModule, BrowserAnimationsModule],
      providers: [CommonService, ToastrService, FormBuilder,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: ActivatedRoute, useValue: route},
        {provide: Router, useValue: router}, DatePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneCallMinutesComponent);
    component = fixture.componentInstance;
    component.displayEditor = false;
    commonService = fixture.debugElement.injector.get(CommonService);
    toastr = fixture.debugElement.injector.get(ToastrService);
    const getMinutesResp = {
      'equipSerialNumber': '190T182',
      'siteName': 'test123',
      'phoneCallDetailsDtoList': [
        {
          'meetingId': 2,
          'meetingLine': 'Test Meeting Line Create After Path Param',
          'meetingDate': 1528914600.000000000,
          'phoneCallMinutes': '<p>Testing After Path Param</p>',
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528365591.076000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528780782.374000000
          }
        }
      ]
    };
    spyOn(commonService, 'getPhoneMinutes').and.returnValue(Observable.from([getMinutesResp]));
    spyOn(commonService, 'updatePhoneMinutes').and.returnValue(Observable.from([{}]));
    route.queryParams.next({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOninit() when meeting ID is not in url', () => {
    expect(component.workflowId).toEqual(route.params.value['id']);
    expect(component.meetingId).toBeUndefined();
  });

  it('should check ngOninit() when meeting ID is in url', () => {
    route.queryParams.next({meetingId: 1});
    component.ngOnInit();
    expect(component.workflowId).toEqual(route.params.value['id']);
    expect(component.meetingId).toEqual(route.queryParams.value['meetingId']);
    const getMinutesResp = {
      'equipSerialNumber': '190T182',
      'siteName': 'test123',
      'phoneCallDetailsDtoList': [
        {
          'meetingId': 2,
          'meetingLine': 'Test Meeting Line Create After Path Param',
          'meetingDate': 1528914600.000000000,
          'phoneCallMinutes': '<p>Testing After Path Param</p>',
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528365591.076000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528780782.374000000
          }
        }
      ]
    };
    expect(component.esnID).toEqual(getMinutesResp.equipSerialNumber);
    expect(component.minutesObj).toBeDefined();
  });

  it('should check updatePhoneMinutes()', () => {
    component.minutesObj = {
      'meetingId': 1,
      'meetingLine': 'Testing Create Meeting ',
      'meetingDate': '06/08/2018 3:00 PM',
      'phoneCallMinutes': '<h1>Testing Phone Line Minutess</h1>',
      'createdBy': '503055897',
      'createdDate': '06/07/2018',
      'modifiedBy': 'Devendra Tummala (503055897)',
      'modifiedDate': '06/08/2018 11:33 AM'
    };
    route.queryParams.next({meetingId: 1});
    component.ngOnInit();
    component.updatePhoneMinutes();
    expect(component.workflowId).toEqual(route.params.value['id']);
    expect(component.meetingId).toEqual(route.queryParams.value['meetingId']);
    expect(toastr.previousToastMessage).toEqual('Updated Phone Minutes Successfully');
    expect(component.minutesObj).toBeDefined();
  });
});
