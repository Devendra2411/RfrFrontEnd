import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { FormGroup } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { ItemAttachmentComponent } from '../item-attachment/item-attachment.component';

@Component({
  selector: 'app-action-item-timeline',
  templateUrl: './action-item-timeline.component.html',
  styleUrls: ['./action-item-timeline.component.css']
})
export class ActionItemTimelineComponent {
  actionItem: any;
  @ViewChild('actionTimelineForm') actionTimelineForm: FormGroup;

  @ViewChild(ItemAttachmentComponent)
  public attachment: ItemAttachmentComponent;

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  timelineObj: Array<any> = [];
  createdDate: Date;
  modifiedBy: string;
  modifiedDate: string;
  content: any;

  constructor(private commonService: CommonService, private toaster: ToastrService) {
    commonService.actionItemData.subscribe((data)=>{
      if(data['actionItemId'] != undefined){
          this.actionItem = data;
          this.modifiedBy = this.actionItem.changeTracking.modifiedBy.firstName + ' ' + this.actionItem.changeTracking.modifiedBy.lastName;
          this.modifiedDate = this.commonService.dateFormatter(this.actionItem.changeTracking.modifiedDate);
          this.attachment.setAttachmentModel(data);
          commonService.getAllActionItemNotes(this.actionItem.actionItemId)
          .map(resp => {
            resp.forEach(r => {
                r.changeTracking.createdDate = this.commonService.dateTimeFormatter(r.changeTracking.createdDate);
                r.changeTracking.modifiedDate = this.commonService.dateFormatter(r.changeTracking.modifiedDate);
            });

            return resp;
          })
          .subscribe((response) => {
            this.timelineObj = response.reverse();
        });
      }
    });
  }

  initActionTimeline() {
    this.actionTimelineForm.reset(); 
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.commonService.createActionItemNote(this.actionItem.actionItemId, form.value).map(resp => {
        resp.changeTracking.createdDate = this.commonService.dateTimeFormatter(resp.changeTracking.createdDate);
        resp.changeTracking.modifiedDate = this.commonService.dateFormatter(resp.changeTracking.modifiedDate);
        return resp;
      }).subscribe((resp) => {
        this.timelineObj.unshift(resp);
        form.reset();
        this.toaster.success('Comment Added', 'New Comment added to timeline');
      });
    }
  }

}
