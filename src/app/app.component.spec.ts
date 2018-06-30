import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {SiteLayoutComponent} from './_layout/site-layout/site-layout.component';
import {SiteHeaderComponent} from './_layout/site-header/site-header.component';
import {SiteNavbarComponent} from './_layout/site-navbar/site-navbar.component';
import {SiteFooterComponent} from './_layout/site-footer/site-footer.component';
import {RFRWorkflowComponent} from './rfr-workflow/rfr-workflow.component';
import {CreateWorkflowComponent} from './create-workflow/create-workflow.component';
import {NoPermissionComponent} from './no-permission/no-permission.component';
import {APP_BASE_HREF, DatePipe} from '@angular/common';
// Other imports
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPermissionsModule} from 'ngx-permissions';
// Angular Material
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
// modules
import {DataTablesModule} from 'angular-datatables';
import {UiSwitchModule} from 'ngx-toggle-switch';
import {McBreadcrumbsModule} from 'ngx-breadcrumbs';
// primeng
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';

import {ToastrModule} from 'ngx-toastr';
// services
import {CommonService} from './services/common.service';
import {BroadcastService} from './services/broadcast.service';

import {RfrHttpInterceptor} from './rfr-http-interceptor';
import { ActionItemComponent } from './action-item/action-item.component';
import { ActionItemTimelineComponent } from './action-item-timeline/action-item-timeline.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhoneCallMinutesComponent } from './phone-call-minutes/phone-call-minutes.component';
import { PhoneMeetingsComponent } from './phone-meetings/phone-meetings.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { TooltipModule } from 'primeng/primeng';



// Needed for Token Call during Application Initialization
export function init_app(commonService: CommonService) {
  return () => commonService.initializeApp();
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, SiteLayoutComponent, SiteHeaderComponent,
        SiteNavbarComponent, SiteFooterComponent,
        RFRWorkflowComponent,
        CreateWorkflowComponent,
        NoPermissionComponent,
        ActionItemComponent, ActionItemTimelineComponent, PageNotFoundComponent
        , PhoneCallMinutesComponent, PhoneMeetingsComponent, TruncatePipe
      ],
      imports: [BrowserModule, FormsModule, HttpClientModule, routing,
        NgxPermissionsModule.forRoot(), BrowserAnimationsModule,
        McBreadcrumbsModule.forRoot(), DataTablesModule,
        UiSwitchModule, MatProgressSpinnerModule, MatButtonModule, AutoCompleteModule, ReactiveFormsModule,
        ToastrModule.forRoot({
          timeOut: 3000,
          preventDuplicates: true
        }), TableModule, MultiSelectModule, AutoCompleteModule,
        TooltipModule],
      providers: [CommonService, FormBuilder,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RfrHttpInterceptor,
          multi: true
        }, BroadcastService, {provide: APP_BASE_HREF, useValue: '/'}, DatePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'RFR Red Flag Revision'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('RFR Red Flag Revision');
  }));

});
