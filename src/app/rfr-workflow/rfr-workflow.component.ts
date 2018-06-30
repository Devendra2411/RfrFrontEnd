import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataTableDirective} from 'angular-datatables';

import {Observable, Subject} from 'rxjs';

import {CommonService} from '../services/common.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-rfr-workflow',
  templateUrl: './rfr-workflow.component.html',
  styleUrls: ['./rfr-workflow.component.css']
})
export class RFRWorkflowComponent implements OnInit {
  cols: any;
  selectedColumns: any;
  projectsData: any[];

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {

    this.cols = [
      {
        label: 'WORKFLOW ID',
        value: 'workflowId',
        field: 'workflowId',
        header: 'WORKFLOW ID',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: '',
        overlayVisible: true
      },
      {
        label: 'ESN',
        value: 'equipSerialNumber',
        field: 'equipSerialNumber',
        header: 'ESN',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: '',
        overlayVisible: true
      },
      {
        label: 'OUTAGE ID',
        value: 'outageId',
        field: 'outageId',
        header: 'OUTAGE ID',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: '',
        overlayVisible: true
      },
      {
        label: 'SITE NAME',
        value: 'siteName',
        field: 'siteName',
        header: 'SITE NAME',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: '',
        overlayVisible: true
      },
      {
        label: 'REGION',
        value: 'region',
        field: 'region',
        header: 'REGION',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: '',
        overlayVisible: true
      },
      {
        label: 'TECHNICAL',
        value: 'technicalCode',
        field: 'technicalCode',
        header: 'TECHNICAL',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: '',
        overlayVisible: true
      },
      {
        label: 'CONTRACT TYPE',
        value: 'contractType',
        field: 'contractType',
        header: 'CONTRACT TYPE',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: '',
        overlayVisible: true
      },
      {
        label: 'OUTAGE TYPE',
        value: 'outageType',
        field: 'outageType',
        header: 'OUTAGE TYPE',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: '',
        overlayVisible: true
      },
      {
        label: 'PROBABILITY',
        value: 'outageProbability',
        field: 'outageProbability',
        header: 'PROBABILITY',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: '',
        overlayVisible: true
      },
      {
        label: 'ACTION',
        value: 'action',
        field: 'action',
        header: 'ACTION',
        showColumns: true,
        filter: true,
        showHeader: false,
        sortable: true,
        tdClass: 'table-text-center',
        option: false
      },
      {
        label: 'START DATE',
        value: 'eStartDate',
        field: 'eStartDate',
        header: 'START DATE',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        isDate: true,
        tdClass: '',
        overlayVisible: true
      },
      {
        label: 'END DATE',
        value: 'eEndDate',
        field: 'eEndDate',
        header: 'END DATE',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        isDate: true,
        tdClass: '',
        overlayVisible: true
      },
      {
        label: 'PROJECT STATUS',
        value: 'projectStatus',
        field: 'projectStatus',
        header: 'PROJECT STATUS',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: '',
        overlayVisible: true
      },
      {
        label: 'EVENT STATUS',
        value: 'eventStatus',
        field: 'eventStatus',
        header: 'EVENT STATUS',
        showColumns: true,
        filter: true,
        showHeader: true,
        sortable: true,
        tdClass: '',
        overlayVisible: true
      }
    ];
    this.getWorkflowDetails();
    this.selectedColumns = this.cols;
    this.selectedColumns = this.selectedColumns.slice(0, 10);
   // Hidding Action in selection dropdown
    this.cols.forEach(function(item, index, object) {
      if (item.field === 'action') {
        object.splice(index, 1);
      }
    });
  }

  getWorkflowDetails() {
    this.commonService.getRFRProjects().map(resp => {
     resp.forEach(element => {
      element['eStartDate'] = this.commonService.dateFormatter(element['eStartDate']);
      element['eEndDate'] = this.commonService.dateFormatter(element['eEndDate']);
     // element['estimatedEndDate'] = this.commonService.dateFormatter(element['eEndDate']);
     // element['actualStartDate'] = this.commonService.dateFormatter(element['eStartDate']);
      // element['actualStartUpDate'] = this.commonService.dateFormatter(element['eStartDate']);
     // element['actualEndDate'] = this.commonService.dateFormatter(element['eStartDate']);
    });
    return resp;
    })
      .subscribe(data => {
        data.forEach(cdata => {
          if (cdata != null && cdata   !== undefined) {
               this.commonService.filterCommonOptions('outageTypes', 'MAP').subscribe((map) => {
                cdata['outageType'] = map.get(cdata['outageType']);
              });
          }
        });
        console.log(JSON.stringify(this.projectsData));
        this.projectsData = data;
      });
  }

  // For keeping action field always as Last Item in Table
  reShuffleSelectedColumns(event: any) {
    const actionObj = {
      label: 'ACTION',
      value: 'action',
      field: 'action',
      header: 'ACTION',
      showColumns: true,
      filter: true,
      showHeader: false,
      sortable: true,
      tdClass: 'table-text-center',
      option: false
    };
    event.forEach(function(item, index, object) {
      if (item.field === 'action') {
        object.splice(index, 1);
      }
    });
    event.push(actionObj);
    this.selectedColumns = event;
  }
}
