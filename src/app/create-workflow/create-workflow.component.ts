import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {SSOObject} from '../common/interfaces/sso-object';
import {CommonService} from '../services/common.service';
import {ToastrService} from 'ngx-toastr';
// models
import {Workflow} from '../common/classes/common-objects';
import {BroadcastService} from '../services/broadcast.service';
import {NgxPermissionsService} from 'ngx-permissions';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-create-workflow',
  templateUrl: './create-workflow.component.html',
  styleUrls: ['./create-workflow.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CreateWorkflowComponent implements OnInit {

  @ViewChild('createWorkflowForm')
  workflowForm: NgForm;
  workflowId = 0;

  searchText: SSOObject[];
  results: SSOObject[];
  /* esnList: { equipSerialNumber: string, siteName: string }[] = []; */
  siteNames: { siteName: string }[] = [];
  siteSuggestedList: { siteName: string }[] = [];
  esnSuggestedList: { equipSerialNumber: string, siteName: string }[] = [];
  outageSuggestedList: { outageId: string } [] = [];
  /* outageList: { outageId: string }[] = []; */
  Object = Object;
  workFlowName: string;
  esnSelected: any;
  siteNameSelected: any;
  outageSelected: any;
  assignEngineeresList: SSOObject[];
  routeSelected: string;
  timeout: any;
  actionTitle: string;
  trainAndEsn: any = [];
  isSingleToggle: boolean;
  saveObject = [];
  atleastOnetrue = [];
  editOutage;
  editESN;
  editUnitName;
  editTrainId;
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private commonService: CommonService,
              private broadCast: BroadcastService,
              private router: Router,
              private toaster: ToastrService,
              private permission: NgxPermissionsService
  ) {
    this.isSingleToggle = false;
    this.routeSelected = 'view';
    this.actionTitle = 'View';
  }

  ngOnInit() {

    // Configure the component to behave as Create,View or Edit based on the route
    const permissions = this.permission.getPermissions();

    const hasCreateAccess: boolean = this._hasAccess(permissions, 'ROLE_WORKFLOW_CREATE');
    const hasViewAccess: boolean = this._hasAccess(permissions, 'ROLE_WORKFLOW_VIEW');

    if (hasCreateAccess) {
      this.route.params.subscribe((params: Params) => {
        if (params['id']) {
          this.routeSelected = 'edit';
          this.actionTitle = 'Edit';
          this.workflowId = params['id'];
          this._updateForm(this.workflowId);
        } else {
          this.actionTitle = 'Create';
          this.routeSelected = 'create';
          this.getSiteNames();
        }
      });
    } else if (hasViewAccess) {
      this.route.params.subscribe((params: Params) => {
        if (params['id']) {
          this.routeSelected = 'view';
          this.actionTitle = 'View';
          this.workflowId = params['id'];
          this._updateForm(this.workflowId);
        }
      });
    }
  }

  _hasAccess(permissions, access: string) {
    const permissionList = Object.keys(permissions);
    return (permissionList.indexOf(access) !== -1) ? true : false;
  }

  // Method to update the form for Edit and View based on the Workflow ID passed
  _updateForm(workflowId: number) {
    this.commonService.getRfrWorkflow(this.workflowId).subscribe((response) => {
      const workflowDetail: Workflow = <Workflow>response;
      this.siteNameSelected = {'siteName': workflowDetail.siteName};
      this.editTrainId =  workflowDetail.trainId;
      this.editESN =  workflowDetail.equipSerialNumber;
      this.editOutage =  workflowDetail.outageId;
      this.editUnitName =  workflowDetail.workflowName;
      const assignedEngineers = workflowDetail.assignedEngineers;
      for (let i = 0; i < assignedEngineers.length; i++) {
        assignedEngineers[i]['name'] = assignedEngineers[i]['firstName'] + ' ' + assignedEngineers[i]['lastName'];
      }
      this.searchText = assignedEngineers;
    });
  }

  // Api call for getting Site name List
  getSiteNames() {
    this.commonService.getSiteNames().subscribe(resp => {
      this.siteNames = resp;
    });

  }

  // API Call to get the SSO based on the query string
  searchSSO(event) {
    if (event.query.length <= 5) {
      this.results = [];
    } else {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.commonService.getSSOUsers(event.query).map(response => {
          const tempResponse: SSOObject[] = [];
          for (let i = 0; i < response.length; i++) {
            const tempObj: SSOObject = <SSOObject>{};
            tempObj.sso = response[i].sso;
            tempObj.firstName = response[i].firstName;
            tempObj.lastName = response[i].lastName;
            tempObj.name = response[i].firstName + ' ' + response[i].lastName;
            tempObj.emailId = response[i].email;
            tempResponse.push(tempObj);
          }
          response = tempResponse;
          return response;
        }).subscribe((response) => {
          this.results = response;
        });
      }, 500);
    }
  }
  // Checking single Toggle should be ON
  checkSingletoggle() {
    this.trainAndEsn.forEach(data => {
      this.atleastOnetrue.push(data.toggle);
    });
    if (!this.atleastOnetrue.includes(true)) {
      this.isSingleToggle = true;
    } else {
      this.isSingleToggle = false;
    }
    this.atleastOnetrue = [];
   }

  // Filtering SiteName List based on search
  filterSite(event) {
    this.siteSuggestedList = this.siteNames.filter(x => {
      return x['siteName'].toString().toLowerCase().indexOf(event.query.toLowerCase()) !== -1;
    });
  }
  // Filtering Outage List based on search
   filterOutageID(event, obj) {
    this.outageSuggestedList = [];
    for (let i = 0; i < obj.length; i++) {
        const item = obj[i];
            this.outageSuggestedList.push(item.toString());
    }
  }

  getOutagesForEsn(sitName: string) {
    // Api Call for getting Outages Based on SITE name
    this.trainAndEsn = [];
    this.outageSelected = ''; // to make this blank when ESN Number is changed
    this.commonService.getOutageESNDetails(sitName).map(resp => {
      resp.forEach(data => {
        data['unitName'] = '';
        data['toggle'] = true;
        data['toggleSelected'] = true;
        data['outageSelected'] = '';
      });
      return resp;
    }).subscribe(resp => {
      this.trainAndEsn = resp;
      this.checkSingletoggle();
    });
   //
  }

  // Api Call to Create/Update Workflow
  createRFRWorkflow() {
    this.saveObject = [];
    if (this.workflowForm.valid) {
      // If the type of Submit is Create
      let obj;
      if (this.routeSelected === 'create') {
        this.trainAndEsn.forEach(data => {
          if (data.toggle === true) {
            data.esnAndOutagesList.forEach(item => {
              obj = {
                'siteName': this.siteNameSelected.siteName,
                'trainId': data.trainId,
                'workflowName': data.unitName,
                'equipSerialNumber': item.equipSerialNumber,
                'outageId': Number(item.outageSelected),
                'assignedEngineers': this.searchText !== undefined ? this.searchText : []
               };
               this.saveObject.push(obj);
            });
          }
         });
        this.commonService.createRfrWorkflow(this.saveObject).subscribe((response) => {
          this.router.navigate(['/rfrWorkflow']);
          this.toaster.success('RFR Workflow Created');
        });
      } else if (this.routeSelected === 'edit') {
        obj = {
          'siteName': this.siteNameSelected.siteName,
          'trainId': this.editTrainId,
          'workflowName': this.editUnitName,
          'equipSerialNumber': this.editESN,
          'outageId': Number(this.editOutage),
          'assignedEngineers': this.searchText !== undefined ? this.searchText : []
        };
        this.commonService.updateRfrWorkflow(obj, this.workflowId).subscribe((response) => {
          this.toaster.success('RFR Workflow has been updated');
        });
      }
    }
  }
}
