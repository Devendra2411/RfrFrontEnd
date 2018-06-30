import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxPermissionsModule} from 'ngx-permissions';
// Angular Material
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge'
// modules
import {DataTablesModule} from 'angular-datatables';
import {UiSwitchModule} from 'ngx-toggle-switch';
import {McBreadcrumbsModule} from 'ngx-breadcrumbs';
import {ToastrModule} from 'ngx-toastr';

// primeng
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextModule} from 'primeng/inputtext';
import {SidebarModule} from 'primeng/sidebar';
import {CalendarModule} from 'primeng/calendar';
import {EditorModule} from 'primeng/editor';
import {FileUploadModule} from 'primeng/fileupload';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/primeng';
import {TooltipModule} from 'primeng/tooltip';
import {GrowlModule} from 'primeng/growl';
import {CheckboxModule} from 'primeng/checkbox';
import {ProgressBarModule} from 'primeng/progressbar';

import {AppComponent} from './app.component';
import {SiteLayoutComponent} from './_layout/site-layout/site-layout.component';
import {SiteHeaderComponent} from './_layout/site-header/site-header.component';
import {SiteNavbarComponent} from './_layout/site-navbar/site-navbar.component';
import {SiteFooterComponent} from './_layout/site-footer/site-footer.component';
import {RFRWorkflowComponent} from './rfr-workflow/rfr-workflow.component';
import {CreateWorkflowComponent} from './create-workflow/create-workflow.component';
import {ActionItemComponent} from './action-item/action-item.component';
import {NoPermissionComponent} from './no-permission/no-permission.component';
import {MyBreadcrumbsResolver} from './common/classes/breadcrumb-resolver';
import {ReadMoreComponent} from './common/components/read-more/read-more.component';
import {ActionItemTimelineComponent} from './action-item-timeline/action-item-timeline.component';

import {routing} from './app.routing';

import {RfrHttpInterceptor} from './rfr-http-interceptor';
// services
import {CommonService} from './services/common.service';
import {BroadcastService} from './services/broadcast.service';
import { PhoneMeetingsComponent } from './phone-meetings/phone-meetings.component';
import { PhoneCallMinutesComponent } from './phone-call-minutes/phone-call-minutes.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DatePipe } from '@angular/common';

// pipes
import {TruncatePipe} from './pipes/truncate.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ItemAttachmentComponent } from './item-attachment/item-attachment.component';
import { FilelengthPipe } from './common/pipes/filelength.pipe';

// Needed for Token Call during Application Initialization
export function init_app(commonService: CommonService) {
  return () => commonService.initializeApp();
}

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, routing,
    NgxPermissionsModule.forRoot(), BrowserAnimationsModule,
    McBreadcrumbsModule.forRoot(), DataTablesModule, DataViewModule, DropdownModule, TooltipModule,
    UiSwitchModule, MatProgressSpinnerModule, MatButtonModule, AutoCompleteModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true
    }), TableModule, MultiSelectModule, AutoCompleteModule, InputTextModule, SidebarModule
    , CalendarModule, EditorModule, ReactiveFormsModule, FileUploadModule, 
    ConfirmDialogModule,GrowlModule, MatBadgeModule,CheckboxModule,ProgressBarModule],
  declarations: [AppComponent, SiteLayoutComponent, SiteHeaderComponent,
    SiteNavbarComponent, SiteFooterComponent, TruncatePipe,
    RFRWorkflowComponent,
    CreateWorkflowComponent,
    ActionItemComponent,
    NoPermissionComponent,
    SideBarComponent,
    ActionItemTimelineComponent,
    ReadMoreComponent,
    PhoneMeetingsComponent,
    PhoneCallMinutesComponent,
    PageNotFoundComponent,
    ItemAttachmentComponent,
    FilelengthPipe
  ],
  bootstrap: [AppComponent],
  providers: [CommonService, {
    provide: APP_INITIALIZER, useFactory: init_app,
    deps: [CommonService], multi: true
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RfrHttpInterceptor,
      multi: true
    }, BroadcastService, MyBreadcrumbsResolver, DatePipe, ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor() {
  }
}
