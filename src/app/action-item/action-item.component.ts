import {Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../services/common.service';
// models
import {NgxPermissionsService} from 'ngx-permissions';

import {SideBarComponent} from '../side-bar/side-bar.component';
import { SelectItem } from 'primeng/primeng';
import {ActionItemTimelineComponent} from '../action-item-timeline/action-item-timeline.component';
import { ActionItemObject } from '../common/interfaces/action-item-object';
import { ItemAttachmentComponent } from '../item-attachment/item-attachment.component';

@Component({
  selector: 'app-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.css']
})

export class ActionItemComponent implements OnInit {
  @ViewChild(SideBarComponent)
  public sideBar: SideBarComponent;

  @ViewChild(ActionItemTimelineComponent)
  public timeline: ActionItemTimelineComponent;

  visibleSidebar: boolean;
  sideBarAction: string;
  formModel: any;
  formModel1;
  formModel2;
  esn: any = 0;
  siteName = 0;
  selectedIndex: number = null;
  data: any[];
  data2: any[];
  selectedItems: any[];
  actionItemsData: ActionItemObject[] = [];

  actionData ;
  displayDialog: boolean;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  showBoxMessage: boolean;
  singleActionData: object;
  workflowId = 1;
  statusMap: Map<string, string> = new Map();
  categoryMap: Map<string, string>;
  ownerMap: Map<string, string>;
  taskMap: Map<string, string>;
  sortByAscending = true;

  constructor(private route: ActivatedRoute,
    private commonService: CommonService,
    private cdRef: ChangeDetectorRef
) {
  this.visibleSidebar = false;
  this.showBoxMessage = false;
}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.workflowId = params['id'];
      this.getAllActionItems(this.workflowId);
    });
    this.statusMap.set('COMPLETE', 'C');
    this.statusMap.set('INCOMPLETE', 'IN');
    this.statusMap.set('NA', 'NA');
    this.commonService.filterCommonOptions('categories', 'MAP').subscribe((map) => {this.categoryMap = map; });
    this.commonService.filterCommonOptions('owner', 'MAP').subscribe((ownerMap) => {this.ownerMap = ownerMap; });
    this.commonService.filterCommonOptions('taskTypes', 'MAP').subscribe((taskMap) => {this.taskMap = taskMap; });
    this.sortOptions = [
            {label: 'Status', value: 'status'},
            {label: 'Action', value: 'itemTitle'},
            {label: 'Owner', value: 'owner'},
            {label: 'Category', value: 'category'},
            {label: 'Due Date', value: 'dueDate'}
        ];
  }
  getAllActionItems(workflowId) {
    this.commonService.getAllActionItems(workflowId).map((resp) => {
      resp.actionItemsList.forEach(r => {
          r.dueDate = this.commonService.dateFormatter(r.dueDate);
      });
      return resp;
    }).subscribe((actionData) => {
      this.actionData = actionData.actionItemsList;
      this.esn = actionData['equipSerialNumber'];
      this.siteName = actionData['siteName'];
    });

  }
  onHideSidebar(formObj) {
    switch (formObj['action']) {
      case 'add':
        formObj['dueDate'] = this.commonService.dateFormatter(formObj['dueDate']);
        this.actionData.unshift(formObj);
        this.selectedIndex = 0 ;
        this.visibleSidebar = formObj['event'];
        this.singleActionData = formObj;   
        this.commonService.updateActionitemData(formObj);     
        this.timeline.initActionTimeline();        
        
      break;
      case 'edit':
        for (let index = 0; index < this.actionData.length; index++) {
          if (this.actionData[index]['actionItemId'] === formObj['actionItemId']) {
            formObj['dueDate'] = this.commonService.dateFormatter(formObj['dueDate']);
            this.actionData[index] = formObj;
          }
        }
        this.visibleSidebar = formObj['event'];

        if (this.singleActionData['actionItemId'] == formObj['actionItemId']) {
          this.singleActionData = formObj;
          this.commonService.updateActionitemData(formObj);
          this.timeline.initActionTimeline();
        }
      break;
      default:
        this.visibleSidebar = formObj['event'];

    }
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  openSideBarComponent($event, action, model) {
    $event.stopPropagation();
    this.sideBar.visibleSidebar = true;
    this.sideBar.action = action;
    model['workflowId'] = this.workflowId;
    this.sideBar.formModel = model;

  }

onSortChange(event) {
    const value = event.value;
    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}


setIndex(event, index: number, data: object) {
    event.stopPropagation();
    this.selectedIndex = index;
    this.showBoxMessage = true;
    this.singleActionData = data;
    this.commonService.updateActionitemData(data);
    this.timeline.initActionTimeline();
}

sortBy() {
  if (this.sortByAscending) {
      this.sortOrder = -1;
      this.sortByAscending = !this.sortByAscending;
  } else {
    this.sortByAscending = !this.sortByAscending;
    this.sortOrder = 1;
  }
}

sortingActionItems(event) {
  if (event.sortField == 'status' && event.sortOrder) {
    let actionDatawithoutNA = this.actionData.filter(data => {
      return data.status != 'NA';
    });
    const actionDatawithonlyNA = this.actionData.filter(data => {
      return data.status == 'NA';
    });
    actionDatawithoutNA = actionDatawithoutNA.sort((data1, data2) => {
      if (data1.status > data2.status) {
        return this.sortByAscending ? -1 : 1;
      }
      if (data1.status < data2.status) {
        return this.sortByAscending ? 1 : -1;
      } else {
        if (data1.itemTitle > data2.itemTitle) {
          return 1;
        }
        if (data1.itemTitle < data2.itemTitle) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    actionDatawithonlyNA.forEach(element => {
      actionDatawithoutNA.push(element);
    });
    this.actionData = actionDatawithoutNA;
  }
}


}
