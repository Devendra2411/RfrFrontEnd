import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

import {CommonService} from '../services/common.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input('showSideBar') visibleSidebar: boolean;
  @Input('action') action: string;
  @Input('formModel') formModel: any;
  @Output() hideSidebar = new EventEmitter();
  dueDate: Date;
  form: FormGroup;
  categoryOptions: any;
  ownerOptions: any;
  typeOptions: any;
  statusOptions: any;
  closeHandler: any;
  actionTitle: string;
  closeElem: Element;
  overlayEle: Element;
  constructor(private fb: FormBuilder,
              private cdRef: ChangeDetectorRef,
              private commonService: CommonService,
              private toaster: ToastrService
              ) {}

  ngOnInit() {
    this.form = this.fb.group({
      itemTitle: this.fb.control('', Validators.required),
      dueDate: this.fb.control('', Validators.required),
      category: this.fb.control('', Validators.required),
      owner : this.fb.control('', Validators.required),
      taskType : this.fb.control('', Validators.required),
      status : this.fb.control('', Validators.required)
    });
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  openSideBar() {
    if (this.action === 'add') {
      this.actionTitle = 'Add';
    }
    this.commonService.filterCommonOptions('categories', 'ARRAY').subscribe((catMap) => {this.categoryOptions = catMap; });
    this.commonService.filterCommonOptions('owner', 'ARRAY').subscribe((ownMap) => {this.ownerOptions = ownMap; });
    this.commonService.filterCommonOptions('taskTypes', 'ARRAY').subscribe((taskMap) => {this.typeOptions = taskMap; });
    this.commonService.filterCommonOptions('status', 'ARRAY').subscribe((statMap) => {this.statusOptions = statMap; });

    if (this.action === 'edit') {
      this.form.reset();
      this.actionTitle = 'Edit';
      this.form.controls.itemTitle.setValue(this.formModel.itemTitle);
      this.form.controls.dueDate.setValue(new Date(this.formModel.dueDate));
      this.form.controls.category.setValue(this.formModel.category);
      this.form.controls.owner.setValue(this.formModel.owner);
      this.form.controls.taskType.setValue(this.formModel.taskType);
      this.form.controls.status.setValue(this.formModel.status);
    }
    this.closeElem = document.querySelector('.ui-sidebar-close');
    this.overlayEle =  document.querySelector('.ui-widget-overlay');

    this.closeHandler = this.onCloseSidebar.bind(this);
    this._addEventListeners();

  }
  _addEventListeners() {
    this.closeElem.addEventListener('click', this.closeHandler, true);
    this.overlayEle.addEventListener('click', this.closeHandler, true);
    document.addEventListener('keyup', this.closeHandler, true);
  }

  _removeEventListeners() {
    this.closeElem.removeEventListener('click', this.closeHandler, true);
    this.overlayEle.removeEventListener('click', this.closeHandler, true);
    document.removeEventListener('keyup', this.closeHandler, true);
  }


  onCloseSidebar(event): any {
    if (event.type === 'click' || (event.type === 'keyup' && event.code === 'Escape')) {
      this.hideSidebarAction('cancel', {});
    }
  }


  hideSidebarAction(action: string, formObj: any) {
    formObj['action'] = action;
    formObj['event'] = false;
    this.visibleSidebar = false;
    if (action !== 'cancel') {
      this.hideSidebar.emit(formObj);
    }

    this.visibleSidebar = false;
    this.form.reset();
    this._removeEventListeners();
  }

  onSubmit(action) {
    if (this.form.valid) {
    const formValue = this.form.value;
    // const unixTime = new Date(this.form.controls.dueDate.value).getTime();
    const unixTime = this.commonService.convertDateToTimeStamp(this.form.controls.dueDate.value);
    formValue['dueDate'] = unixTime;
    // this.form.controls.dueDate.setValue();
      switch (this.action) {
        case 'edit':
          this.commonService.updateActionItem(this.formModel.workflowId, this.formModel.actionItemId, formValue).subscribe((response) => {
            this.toaster.success('Success', 'Action Item has been updated', {
              timeOut: 3000,
            });
            this.hideSidebarAction('edit', response);
          }, (error) => {
            this.toaster.error('Error', error, {
              timeOut: 3000,
            });
          });
        break;
        case 'add':
          this.commonService.createActionItem(this.formModel.workflowId, formValue).subscribe((response) => {
            this.toaster.success('Success', 'New Action Item added', {
              timeOut: 3000,
            });
            this.hideSidebarAction('add', response);
          }, (error) => {
            this.toaster.error('Error', error, {
              timeOut: 3000,
            });
          });
        break;
      }

    }
  }

}
