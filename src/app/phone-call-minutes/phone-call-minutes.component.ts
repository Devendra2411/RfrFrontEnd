import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NgForm, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PhoneLineItemObject } from '../common/interfaces/phone-line-item-object';
import { ToastrService } from 'ngx-toastr';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-phone-call-minutes',
  templateUrl: './phone-call-minutes.component.html',
  styleUrls: ['./phone-call-minutes.component.css']
})
export class PhoneCallMinutesComponent implements OnInit {
  minutesObj: PhoneLineItemObject = new PhoneLineItemObject();
  minDate: Date;
  workflowId: number;
  meetingId: number;
  editFlag = false;
  esnID = '';
  siteName = '';
  displayEditor = true;
  updateCallMinutesForm: FormGroup;
  constructor(private commonService: CommonService, private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private permissionService: NgxPermissionsService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.updateCallMinutesForm = this.fb.group({
      meetingLine: this.fb.control({value: '', disabled: !this.editFlag}, Validators.required),
      meetingDate: this.fb.control({value: '', disabled: !this.editFlag}, Validators.required),
      phoneCallMinutes: this.fb.control('', Validators.required)
    });
    this.route.queryParams.subscribe((params) => {
      this.meetingId = params['meetingId'];
    });
    this.route.params.subscribe((params) => {
      this.workflowId = params['id'];
    });
    this.permissionService.hasPermission('ROLE_PHONE_CALL_CREATE').then(resp => {
      this.editFlag = resp;
      if (this.editFlag) {
        this.updateCallMinutesForm.controls.meetingLine.enable();
        this.updateCallMinutesForm.controls.meetingDate.enable();
      }
    });
    this.getPhoneMinutes();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  updatePhoneMinutes() {
    if (this.updateCallMinutesForm.valid) {
      const obj = Object.assign({}, this.minutesObj);
      obj.meetingLine = this.updateCallMinutesForm.controls['meetingLine'].value;
      obj.phoneCallMinutes = this.updateCallMinutesForm.controls['phoneCallMinutes'].value;
      obj.meetingDate = this.updateCallMinutesForm.controls['meetingDate'].value;
      obj.meetingDate = this.commonService.convertDateToTimeStamp(obj.meetingDate);
      obj.modifiedDate = this.commonService.convertDateToTimeStamp(obj.modifiedDate);
      obj.createdDate = this.commonService.convertDateToTimeStamp(obj.createdDate);
      this.commonService.updatePhoneMinutes(this.workflowId, this.meetingId, obj)
        .subscribe((resp) => {
          this.toaster.success('Updated Phone Minutes Successfully');
        });
    }

  }

  getPhoneMinutes() {
    if (this.meetingId) {
      this.commonService.getPhoneMinutes(this.workflowId, this.meetingId).map((resp) => {
        const minutesObj: any = resp['phoneCallDetailsDtoList'][0];
        minutesObj['meetingId'] = minutesObj['meetingId'];
        minutesObj['equipSerialNumber'] = resp['equipSerialNumber'];
        minutesObj['siteName'] = resp['siteName'];
        minutesObj['meetingDate'] = this.commonService.dateTimeFormatter(minutesObj['meetingDate']);
        minutesObj['phoneCallMinutes'] = minutesObj['phoneCallMinutes'];
        minutesObj['createdBy'] = minutesObj['changeTracking']['createdBy']['sso'];
        minutesObj['createdDate'] = this.commonService.dateFormatter(minutesObj['changeTracking']['createdDate']);
        minutesObj['modifiedBy'] = minutesObj['changeTracking']['modifiedBy']['firstName']
          + ' ' + minutesObj['changeTracking']['modifiedBy']['lastName']
          + ' (' + minutesObj['changeTracking']['modifiedBy']['sso'] + ')';
        minutesObj['modifiedDate'] = this.commonService.dateTimeFormatter(minutesObj['changeTracking']['modifiedDate']);
        return minutesObj;
      }).subscribe((resp) => {
        this.esnID = resp['equipSerialNumber'];
        this.siteName = resp['siteName'];
        this.updateCallMinutesForm.get('meetingLine').setValue(resp['meetingLine']);
        this.updateCallMinutesForm.get('meetingDate').setValue(resp['meetingDate']);
        this.updateCallMinutesForm.get('phoneCallMinutes').setValue(resp['phoneCallMinutes']);
        this.minutesObj = resp;
      });
    } else {
      this.router.navigate([`rfrWorkflow/${this.workflowId}/meetinglines`]);
    }
  }
}
