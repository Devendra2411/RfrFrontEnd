import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {ResponseOptions, Response} from '@angular/http';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DatePipe } from '@angular/common';

import {ToastrModule, ToastrService} from 'ngx-toastr';
import {NgxPermissionsModule, NgxPermissionsService} from 'ngx-permissions';

import {Observable} from 'rxjs/Observable';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BehaviorSubject} from 'rxjs';

import {MyBreadcrumbsResolver} from './breadcrumb-resolver';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';


describe('MyBreadcrumbsResolver', () => {
  let fixture: ComponentFixture<MyBreadcrumbsResolver>;
  let breadcrumbResolver: MyBreadcrumbsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        BrowserModule, FormsModule,
          HttpClientModule, NgxPermissionsModule.forRoot(), ToastrModule.forRoot({
            timeOut: 3000,
            preventDuplicates: true
          }), BrowserAnimationsModule, ReactiveFormsModule,
      ],
      providers: [ MyBreadcrumbsResolver, NgxPermissionsService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {

  });

  it('should be created', inject([
    MyBreadcrumbsResolver], (service: MyBreadcrumbsResolver) => {
    expect(service).toBeTruthy();
  }));

  it('should resolve breadcrumb to create workflow with ROLE_WORKFLOW_CREATE', inject([
    MyBreadcrumbsResolver, NgxPermissionsService], (service: MyBreadcrumbsResolver, permission: NgxPermissionsService) => {
    permission.addPermission('ROLE_WORKFLOW_CREATE');
    const route1 = new ActivatedRouteSnapshot();

    const route = {
      url: '/',
      params : {},
      parent : {
                  url: '/',
                  params : {},
                  pathFromRoot : [{url : [{path: ''}]}]
                },
      pathFromRoot : ['/']
    };
    const response = service.resolve((route as any), {} as RouterStateSnapshot);

    expect(response[0]['text']).toEqual('Create Workflow');

  }));

  it('should resolve breadcrumb to edit workflow with ROLE_WORKFLOW_CREATE', inject([
    MyBreadcrumbsResolver, NgxPermissionsService], (service: MyBreadcrumbsResolver, permission: NgxPermissionsService) => {
    permission.addPermission('ROLE_WORKFLOW_CREATE');

    const route = {
      url: '/',
      params : {id: 1},
      parent : {
                  url: '/',
                  params : {},
                  pathFromRoot : [{url : [{path: ''}]}]
                },
      pathFromRoot : ['/']
    };
    const response = service.resolve((route as any), {} as RouterStateSnapshot);

    expect(response[0]['text']).toEqual('Edit Workflow');
  }));

  it('should resolve breadcrumb to view workflow with ROLE_WORKFLOW_VIEW', inject([
    MyBreadcrumbsResolver, NgxPermissionsService], (service: MyBreadcrumbsResolver, permission: NgxPermissionsService) => {
    permission.addPermission('ROLE_WORKFLOW_VIEW');

    const route = {
      url: '/',
      params : {id: 1},
      parent : {
                  url: '/',
                  params : {},
                  pathFromRoot : [{url : [{path: ''}]}]
                },
      pathFromRoot : ['/']
    };
    const response = service.resolve((route as any), {} as RouterStateSnapshot);

    expect(response[0]['text']).toEqual('View Workflow');
  }));


  it('should resolve breadcrumb to no permission if doesnt have any parameter id', inject([
    MyBreadcrumbsResolver, NgxPermissionsService], (service: MyBreadcrumbsResolver, permission: NgxPermissionsService) => {
    permission.addPermission('ROLE_WORKFLOW_VIEW');

    const route = {
      url: '/',
      params : {},
      parent : {
                  url: '/',
                  params : {},
                  pathFromRoot : [{url : [{path: ''}]}]
                },
      pathFromRoot : ['/']
    };
    const response = service.resolve((route as any), {} as RouterStateSnapshot);

    expect(response[0]['text']).toEqual('No Permission');
  }));






});
