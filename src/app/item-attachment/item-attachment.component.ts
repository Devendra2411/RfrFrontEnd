import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/components/common/api';
import { CommonService } from '../services/common.service';
import { HttpEventType } from '@angular/common/http';
import { FileTypes } from '../common/enums/file-type.enum';
import { BroadcastService } from '../services/broadcast.service';
import { ConfirmDialog } from 'primeng/primeng';

@Component({
  selector: 'app-item-attachment',
  templateUrl: './item-attachment.component.html',
  styleUrls: ['./item-attachment.component.css']
})
export class ItemAttachmentComponent implements OnInit {
  @Input('formModel') formModel: any;
  @ViewChild('fileUpload') fileUpload:any;
  @ViewChild('cd') confirmDialog:ConfirmDialog;
  visibleSidebar :boolean = false;
  msgs: Message[] = [];
  files = [];
  selectedValues : Array<string> = [];
  fileAttachments:Array<any> = [];
  errorMsgs:any;

  constructor(
    private confirmationService: ConfirmationService,
    private cdRef: ChangeDetectorRef,
    private commonService: CommonService,
    private broadcastService: BroadcastService
  ) { }

  ngOnInit() {
    this.broadcastService.broadcastMessages.subscribe((val) => {
      this.errorMsgs = val;
    });
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  toggleSideBar(){
    this.visibleSidebar = !this.visibleSidebar;
    this.selectedValues = [];
  }

  setAttachmentModel(data){
    this.formModel = data;
  }

  confirmDelete() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to deleted the selected attachments?',
        accept: () => {
           let deleteAttList = [];
            //Call service to delete the files
            for(let value of this.selectedValues){
              let index = this.formModel.uploadedFiles.findIndex(attachment=> attachment.id == Number(value));
              deleteAttList.push(this.formModel.uploadedFiles[index]);
            }
            this.commonService.deleteAttachmentActionItem(this.formModel['actionItemId'],deleteAttList).subscribe((resp:Response)=>{
              this.formModel.uploadedFiles = resp;
              this.msgs = [{severity:'info', summary:'Confirmed', detail:'Attachment(s) have been deleted!'}];
              this.selectedValues = [];
            })
        } 
    });
  }
  check7ZipFileType(file){
    if(file.type == '' && (file.name.indexOf('.7z') > -1)){
      return true;
    }
    else
      return false;
  }

  attachmentUploader(event){
    //Call service to upload the files
    let fd = new FormData();
    let fileTypes = Object.keys(FileTypes);
    for(let file of event.files) {
      if(fileTypes.indexOf(file.type) >= 0 || this.check7ZipFileType(file)){
        fd.append('files', file);
      }
      else{ 
        let message = `<div><b>Cannot upload ${file.name}.</b></div>
                       <div>[Supported File Types: doc, docx, xlsx, xls, jpg, jpeg, tiff, png, bitmap, svg , pdf, zip, txt, 7zip]</div>`;
        this.msgs = [{severity:'warn', summary:'FileType not allowed', detail: message}];
        return false;
      }
    }
    this.fileUpload.showUploadButton = false;
    this.fileUpload.showCancelButton = false;
    
    this.commonService.createAttachmentActionItem(this.formModel['actionItemId'],fd).subscribe((resp)=>{
      if(resp.type ===  HttpEventType.UploadProgress){
        this.fileUpload.progress = Math.round(100 * resp.loaded / resp.total);
      }
      if (resp.type === HttpEventType.Response) {
        this.fileUpload.progress = 0;
        this.fileUpload.clear();
        this.msgs = [{severity:'info', summary:'Confirmed', detail:'Attachments uploaded successfully!'}];
        this.formModel.uploadedFiles = resp.body;
        this.fileUpload.showUploadButton = true;
        this.fileUpload.showCancelButton = true;
        this.cdRef.detectChanges();
      }
    },error =>{
      console.log(error);
      this.fileUpload.progress = 0;
      this.fileUpload.showCancelButton = true;
      this.fileUpload.showUploadButton = true;
      this.broadcastService.spinnerStatus.next(false);
    })
    console.log(fd);
  }

  onClear(){
    this.fileUpload.showUploadButton = true;
    this.fileUpload.showCancelButton = true;
    this.fileUpload.progress = 0;
    this.broadcastService.spinnerStatus.next(false);    
  }

}