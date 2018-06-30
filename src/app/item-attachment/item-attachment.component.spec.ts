import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe, APP_BASE_HREF } from '@angular/common';
import { ItemAttachmentComponent } from './item-attachment.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonService} from '../services/common.service';
import {BroadcastService} from '../services/broadcast.service';
import {GrowlModule} from 'primeng/growl';
import {CheckboxModule} from 'primeng/checkbox';
import {ProgressBarModule} from 'primeng/progressbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {Confirmation} from 'primeng/components/common/confirmation';
import {SidebarModule} from 'primeng/sidebar';
import {MatBadgeModule} from '@angular/material/badge';
import {FileUploadModule} from 'primeng/fileupload';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {NgxPermissionsModule,NgxPermissionsService} from 'ngx-permissions';

import {Observable} from 'rxjs/Observable';
import {BrowserModule} from '@angular/platform-browser';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FilelengthPipe } from '../common/pipes/filelength.pipe';

describe('ItemAttachmentComponent', () => {
  let component: ItemAttachmentComponent;
  let fixture: ComponentFixture<ItemAttachmentComponent>;
  let commonService:CommonService;
  let confirmationService : ConfirmationService;
  let formModel = {"actionItemId":1,"itemTitle":"Intial task for this workflow","dueDate":1529490372.029000000,"levelValue":1,"status":"COMPLETE","category":"START_UP_CHECKLIST","owner":"FE","taskType":"FIRST_FIRE","changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1529490372.029000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1529490372.029000000},"workflowId":1,"uploadedFiles":[]};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAttachmentComponent,FilelengthPipe ],
      imports: [BrowserModule,
        AutoCompleteModule, BrowserAnimationsModule,
        GrowlModule,CheckboxModule,ProgressBarModule,
        ConfirmDialogModule,MatBadgeModule,SidebarModule,ToastrModule.forRoot({
          timeOut: 3000,
          preventDuplicates: true
        }),FileUploadModule,HttpClientModule,NgxPermissionsModule.forRoot(),
        RouterTestingModule
      ],

        providers: [BroadcastService,
          CommonService,ConfirmationService,NgxPermissionsService,
          ToastrService,
          DatePipe,{provide: APP_BASE_HREF, useValue: '/'}
        ],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAttachmentComponent);
    component = fixture.componentInstance;
    commonService = fixture.debugElement.injector.get(CommonService);
    confirmationService = fixture.debugElement.injector.get(ConfirmationService);
    let returnSuccess = {type:4,body:[{"id":78,"fileName":"mark_occurrences.gif","filePath":"300949544889","fileSize":321,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530077999.631000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530078065.856000000},"actionItemId":1},{"id":86,"fileName":"saveEvents.js","filePath":"300956733095","fileSize":699,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530079882.287000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530079882.287000000},"actionItemId":1},{"id":87,"fileName":"mvnw","filePath":"300955443696","fileSize":6468,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530079961.046000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530079961.046000000},"actionItemId":1},{"id":88,"fileName":"pom.xml","filePath":"300955372178","fileSize":2213,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530079962.243000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530079962.243000000},"actionItemId":1},{"id":89,"fileName":"mvnw.cmd","filePath":"300956824922","fileSize":4994,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530079976.297000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530079976.297000000},"actionItemId":1},{"id":90,"fileName":"HELP-US-OUT.txt","filePath":"300979743805","fileSize":323,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530092523.217000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530092523.217000000},"actionItemId":1},{"id":91,"fileName":"594726837966507.ics","filePath":"300980438603","fileSize":2442,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530093174.221000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530093174.221000000},"actionItemId":1},{"id":81,"fileName":"tree.css","filePath":"300955085853","fileSize":2319,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530079461.066000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530093644.080000000},"actionItemId":1},{"id":79,"fileName":"bootstrap-multiselect 9.15.css","filePath":"300951446525","fileSize":1511,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530079092.689000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530093693.395000000},"actionItemId":1},{"id":85,"fileName":"getEvents.js","filePath":"300956438521","fileSize":828,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530079838.860000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530093773.834000000},"actionItemId":1},{"id":82,"fileName":"jquery v2.0.3.min.js","filePath":"300951157817","fileSize":83612,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530079536.852000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530093842.382000000},"actionItemId":1},{"id":92,"fileName":"multiselect.min.js","filePath":"300980937968","fileSize":11308,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530093883.945000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530093883.945000000},"actionItemId":1},{"id":97,"fileName":"DateRangeTemplate.html","filePath":"300988632648","fileSize":13630,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530094337.721000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530094358.713000000},"actionItemId":1},{"id":95,"fileName":"ReportChartView.js","filePath":"300987220302","fileSize":85378,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530094327.645000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530094360.090000000},"actionItemId":1},{"id":98,"fileName":"ReportGlobalView.js","filePath":"300988621884","fileSize":247228,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530094341.663000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530094362.978000000},"actionItemId":1},{"id":94,"fileName":"reporting-style.css","filePath":"300988016123","fileSize":32810,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530094029.430000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530094364.165000000},"actionItemId":1},{"id":99,"fileName":"ReportScheduleView.js","filePath":"300989277958","fileSize":93884,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530094344.158000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530094365.463000000},"actionItemId":1},{"id":93,"fileName":"UIOptions.js","filePath":"300981015076","fileSize":31376,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530093934.145000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530094366.666000000},"actionItemId":1},{"id":96,"fileName":"ConfigureSchedulerTemplate.html","filePath":"300988625658","fileSize":13475,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530094336.552000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530096204.914000000},"actionItemId":1},{"id":100,"fileName":"parameter_panelControllers.js","filePath":"300990111674","fileSize":6668,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530096256.422000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530096268.061000000},"actionItemId":1},{"id":101,"fileName":"parameterpanelview.html","filePath":"300988868275","fileSize":10961,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530096272.015000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530096272.015000000},"actionItemId":1}]}
    let returnDeleteSuccess = [ { "id": 87, "fileName": "mvnw", "filePath": "300955443696", "fileSize": 6468, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530079961.046, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530079961.046 }, "actionItemId": 1 }, { "id": 88, "fileName": "pom.xml", "filePath": "300955372178", "fileSize": 2213, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530079962.243, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530079962.243 }, "actionItemId": 1 }, { "id": 89, "fileName": "mvnw.cmd", "filePath": "300956824922", "fileSize": 4994, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530079976.297, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530079976.297 }, "actionItemId": 1 }, { "id": 90, "fileName": "HELP-US-OUT.txt", "filePath": "300979743805", "fileSize": 323, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530092523.217, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530092523.217 }, "actionItemId": 1 }, { "id": 91, "fileName": "594726837966507.ics", "filePath": "300980438603", "fileSize": 2442, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530093174.221, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530093174.221 }, "actionItemId": 1 }, { "id": 81, "fileName": "tree.css", "filePath": "300955085853", "fileSize": 2319, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530079461.066, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530093644.08 }, "actionItemId": 1 }, { "id": 79, "fileName": "bootstrap-multiselect 9.15.css", "filePath": "300951446525", "fileSize": 1511, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530079092.689, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530093693.395 }, "actionItemId": 1 }, { "id": 85, "fileName": "getEvents.js", "filePath": "300956438521", "fileSize": 828, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530079838.86, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530093773.834 }, "actionItemId": 1 }, { "id": 82, "fileName": "jquery v2.0.3.min.js", "filePath": "300951157817", "fileSize": 83612, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530079536.852, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530093842.382 }, "actionItemId": 1 }, { "id": 92, "fileName": "multiselect.min.js", "filePath": "300980937968", "fileSize": 11308, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530093883.945, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530093883.945 }, "actionItemId": 1 }, { "id": 97, "fileName": "DateRangeTemplate.html", "filePath": "300988632648", "fileSize": 13630, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530094337.721, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530094358.713 }, "actionItemId": 1 }, { "id": 95, "fileName": "ReportChartView.js", "filePath": "300987220302", "fileSize": 85378, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530094327.645, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530094360.09 }, "actionItemId": 1 }, { "id": 98, "fileName": "ReportGlobalView.js", "filePath": "300988621884", "fileSize": 247228, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530094341.663, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530094362.978 }, "actionItemId": 1 }, { "id": 94, "fileName": "reporting-style.css", "filePath": "300988016123", "fileSize": 32810, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530094029.43, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530094364.165 }, "actionItemId": 1 }, { "id": 99, "fileName": "ReportScheduleView.js", "filePath": "300989277958", "fileSize": 93884, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530094344.158, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530094365.463 }, "actionItemId": 1 }, { "id": 93, "fileName": "UIOptions.js", "filePath": "300981015076", "fileSize": 31376, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530093934.145, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530094366.666 }, "actionItemId": 1 }, { "id": 96, "fileName": "ConfigureSchedulerTemplate.html", "filePath": "300988625658", "fileSize": 13475, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530094336.552, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530096204.914 }, "actionItemId": 1 }, { "id": 100, "fileName": "parameter_panelControllers.js", "filePath": "300990111674", "fileSize": 6668, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530096256.422, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530096268.061 }, "actionItemId": 1 }, { "id": 101, "fileName": "parameterpanelview.html", "filePath": "300988868275", "fileSize": 10961, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530096272.015, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530096272.015 }, "actionItemId": 1 } ];
    spyOn(commonService, 'createAttachmentActionItem').and.returnValues(Observable.from([{loaded:11158,total:11158,type:1}]),Observable.from([returnSuccess]),Observable.throwError([{
      status: 404,
      error: '404'
    }]));
    spyOn(commonService, 'deleteAttachmentActionItem').and.returnValues(Observable.from([returnDeleteSuccess]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should updated the component with the new model on action item selection',()=>{
    component.setAttachmentModel(formModel);
    expect(component.formModel).toEqual(formModel);
  })

  it('should show the progress and return all the list of attachments on success and rest on error',()=>{
    component.setAttachmentModel(formModel);
    let arrayOfBlob = new Array<Blob>();
    let file1 = new File(arrayOfBlob,'chart(1).png',{
      type: 'image/png'
    });
    let file2 = new File(arrayOfBlob,'chart(2).7z',{
      type: ''
    });
    let selectedFiles = {files : [file1,file2]};
    //checking Progress
    component.attachmentUploader(selectedFiles);
    expect(component.fileUpload.progress).toEqual(100);
    //checking successful upload
    component.attachmentUploader(selectedFiles);
    expect(component.fileUpload.progress).toEqual(0);
    expect(component.formModel.uploadedFiles).toContain(jasmine.objectContaining({"id":78,"fileName":"mark_occurrences.gif","filePath":"300949544889","fileSize":321,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530077999.631000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530078065.856000000},"actionItemId":1}));
    //checking error while upload
    component.attachmentUploader(selectedFiles);
    expect(component.fileUpload.progress).toEqual(0);
    expect(component.fileUpload.showUploadButton).toBeTruthy();
  });

  it('should throw error when trying to upload a file with unsupported format',()=>{
    component.setAttachmentModel(formModel);
    let arrayOfBlob = new Array<Blob>();
    let file1 = new File(arrayOfBlob,'chart(1).exe',{
      type: 'application/x-msdownload'
    });
    let selectedFiles = {files : [file1]};
    component.attachmentUploader(selectedFiles);
    expect(component.msgs[0]['summary']).toEqual('FileType not allowed');
  });

  it('should delete the selected attachment(s)',()=>{
    formModel = { "actionItemId": 1, "itemTitle": "Intial task for this workflow", "dueDate": 1529490372.029, "levelValue": 1, "status": "COMPLETE", "category": "START_UP_CHECKLIST", "owner": "FE", "taskType": "FIRST_FIRE", "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1529490372.029, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1529490372.029 }, "workflowId": 1, "uploadedFiles": [ { "id": 78, "fileName": "mark_occurrences.gif", "filePath": "300949544889", "fileSize": 321, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530077999.631, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530078065.856 }, "actionItemId": 1 }, { "id": 86, "fileName": "saveEvents.js", "filePath": "300956733095", "fileSize": 699, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530079882.287, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530079882.287 }, "actionItemId": 1 }, { "id": 87, "fileName": "mvnw", "filePath": "300955443696", "fileSize": 6468, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530079961.046, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530079961.046 }, "actionItemId": 1 }, { "id": 88, "fileName": "pom.xml", "filePath": "300955372178", "fileSize": 2213, "changeTracking": { "createdBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "createdDate": 1530079962.243, "modifiedBy": { "sso": "503062340", "firstName": "Nitish", "lastName": "Saini" }, "modifiedDate": 1530079962.243 }, "actionItemId": 1 } ] };
    let value:Confirmation = {message:'Are you sure that you want to deleted the selected attachments?'}
    component.formModel = formModel;
    component.selectedValues = ['78','86'];
    component.confirmDelete();
    component.confirmDialog.accept();
    expect(component.formModel.uploadedFiles).not.toContain(jasmine.objectContaining({"id":78,"fileName":"mark_occurrences.gif","filePath":"300949544889","fileSize":321,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530077999.631000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530078065.856000000},"actionItemId":1}));
    expect(component.formModel.uploadedFiles).not.toContain(jasmine.objectContaining({"id":86,"fileName":"saveEvents.js","filePath":"300956733095","fileSize":699,"changeTracking":{"createdBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"createdDate":1530079882.287000000,"modifiedBy":{"sso":"503062340","firstName":"Nitish","lastName":"Saini"},"modifiedDate":1530079882.287000000},"actionItemId":1}));
  })

});
