import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';

import { PhoneLineItemObject } from '../common/interfaces/phone-line-item-object';
import { ToastrService } from 'ngx-toastr';
import {BroadcastService} from '../services/broadcast.service';

@Component({
  selector: 'app-phone-meetings',
  templateUrl: './phone-meetings.component.html',
  styleUrls: ['./phone-meetings.component.css']
})
export class PhoneMeetingsComponent implements OnInit {
  cols: any;
  selectedColumns: any;
  lineItemsData: PhoneLineItemObject[] = [];
  workflowId = 1;
  createLineItemForm: FormGroup;
  displayCreate = false;
  esnID = '';
  siteName = '';
  errorForMeetingLine: any;

  constructor(private commonService: CommonService, private route: ActivatedRoute,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private broadcast: BroadcastService) { }

  ngOnInit() {
    this.createLineItemForm = this.fb.group({
      meetingLine: this.fb.control('', Validators.required),
      meetingDate: this.fb.control('', Validators.required)
    });

    this.route.params.subscribe((params) => {
      this.workflowId = params['id'];
    });
    this.cols = [
      {
        label: 'MEETING ID',
        value: 'meetingId',
        field: 'meetingId',
        header: 'MEETING ID',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: ''
      },
      {
        label: 'MEETING LINE ITEM',
        value: 'meetingLine',
        field: 'meetingLine',
        header: 'MEETING LINE ITEM',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: ''
      },
      {
        label: 'MEETING DATE',
        value: 'meetingDate',
        field: 'meetingDate',
        header: 'MEETING DATE',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        isDate: true,
        tdClass: ''
      },
      {
        label: 'CREATED BY',
        value: 'createdBy',
        field: 'createdBy',
        header: 'CREATED BY',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: ''
      },
      {
        label: 'CREATED DATE',
        value: 'createdDate',
        field: 'createdDate',
        header: 'CREATED DATE',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        isDate: true,
        tdClass: ''
      },
      {
        label: 'ACTION',
        value: 'action',
        field: 'action',
        header: 'ACTION',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: 'table-text-center'
      }
    ];
    this.selectedColumns = this.cols;
    this.getPhoneLineItemsList();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  getPhoneLineItemsList() {
    this.commonService.getPhoneLineItemsList(this.workflowId).map((resp) => {
      resp['phoneCallDetailsDtoList'].forEach(element => {
        element['meetingDate'] = this.commonService.dateTimeFormatter(element.meetingDate);
        element['createdBy'] = element['changeTracking']['createdBy']['sso'];
        element['createdDate'] = this.commonService.dateFormatter(element['changeTracking']['createdDate']);
      });
      return resp;
    }).subscribe((resp) => {
      this.lineItemsData = resp['phoneCallDetailsDtoList'];
      this.esnID = resp['equipSerialNumber'];
      this.siteName = resp['siteName'];
    });
  }
  createPhoneLineItem() {
    if (this.createLineItemForm.valid) {
      const obj = Object.assign({}, this.createLineItemForm.value);
      obj.meetingDate = this.commonService.convertDateToTimeStamp(this.createLineItemForm.value.meetingDate);
      this.commonService.createPhoneLineItem(this.workflowId, obj).map((element) => {
        element['meetingDate'] = this.commonService.dateTimeFormatter(element.meetingDate);
        element['createdBy'] = element['changeTracking']['createdBy']['sso'];
        element['createdDate'] = this.commonService.dateFormatter(element['changeTracking']['createdDate']);

        return element;
      }).subscribe((resp) => {
        this.toaster.success('Created Phone Line Item Successfully');
        this.displayCreate = false;
        this.lineItemsData.unshift(resp);
      },
        (error) => {
          this.broadcast.broadcastMessages.subscribe((val) => {
            this.errorForMeetingLine = val;
          });
        });
    }
  }

  openSideBar() {
    this.createLineItemForm.reset();
  }
}
