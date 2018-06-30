import { TestBed, inject } from '@angular/core/testing';
import { APP_INITIALIZER } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { RfrHttpInterceptor } from '../rfr-http-interceptor';
import { BroadcastService } from '../services/broadcast.service';
import { defer } from 'rxjs';
import { Workflow } from '../common/classes/common-objects';
import { SSOObject } from '../common/interfaces/sso-object';
import { DatePipe } from '@angular/common';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { Router } from '@angular/router';

export function init_app(commonService: CommonService) {
  return () => commonService.initializeApp();
}

xdescribe('CommonService', () => {
  let http: HttpClient;
  let httpClientSpy: { get: jasmine.Spy };
  let commonService: CommonService;
  let createWorkflowId = 0;
  let createActionItemId = 0;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, NgxPermissionsModule.forRoot()],
      providers: [CommonService, BroadcastService, HttpClient, {
        provide: HTTP_INTERCEPTORS,
        useClass: RfrHttpInterceptor,
        multi: true
      },
        {
          provide: APP_INITIALIZER, useFactory: init_app,
          deps: [CommonService], multi: true
        },
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        { provide: DatePipe }

      ]
    });
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });

  it('should be created', inject([
    CommonService], (service: CommonService) => {
      expect(service).toBeTruthy();
    }));
  // START: GET Common Option Service Test Cases
  it('should get all the common options', function (done) {
    inject([
      CommonService], async (service: CommonService) => {
        const defaultOptions = {
          'outageTypes': [
            {
              'id': 'CALL_OUT',
              'text': 'Call Out'
            },
            {
              'id': 'HGP',
              'text': 'HGP'
            },
            {
              'id': 'MI',
              'text': 'MI'
            },
            {
              'id': 'NA',
              'text': 'NA'
            },
            {
              'id': 'ONSITE_TRAINING',
              'text': 'On Site Training'
            },
            {
              'id': 'OTHER',
              'text': 'Other'
            },
            {
              'id': 'TDI',
              'text': 'TDI'
            },
            {
              'id': 'VALUE_PACK',
              'text': 'Value Pack'
            },
            {
              'id': 'WARRANTY',
              'text': 'Warranty'
            }
          ],
          'categories': [
            {
              'id': 'START_UP_CHECKLIST',
              'text': 'Start-Up Checklist'
            },
            {
              'id': 'TUNING',
              'text': 'Tuning'
            },
            {
              'id': 'GENERATOR',
              'text': 'Generator'
            },
            {
              'id': 'CLEANLINESS',
              'text': 'Cleanliness'
            },
            {
              'id': 'COMPLIANCE_CHECKLIST',
              'text': 'Compliance Checklist'
            },
            {
              'id': 'MD_CENTER',
              'text': 'MD Center'
            },
            {
              'id': 'AUDITS_COMM_PROCEDURES',
              'text': 'Audits and Comissioning Procedures'
            },
            {
              'id': 'SITE_DEMOBILIZATION',
              'text': 'Site Demobilization'
            },
            {
              'id': 'TUNING_KIT',
              'text': 'Tuning Kit'
            }
          ],
          'status': [
            {
              'id': 'COMPLETE',
              'text': 'Complete'
            },
            {
              'id': 'IN_COMPLETE',
              'text': 'In Complete'
            },
            {
              'id': 'NA',
              'text': 'NA'
            }
          ],
          'owner': [
            {
              'id': 'FE',
              'text': 'FE'
            },
            {
              'id': 'CONTROLS_REQ_ENGINEER',
              'text': 'Controls Req Engr'
            },
            {
              'id': 'IRFR_ADMIN',
              'text': 'IRFR Admin'
            },
            {
              'id': 'OPS_CENTER',
              'text': 'Ops Center'
            },
            {
              'id': 'PSENGR',
              'text': 'PSENGR'
            }
          ],
          'taskTypes': [
            {
              'id': 'FIRST_FIRE',
              'text': 'First Fire'
            },
            {
              'id': 'DEMOBILIZATION',
              'text': 'DeMob/Punchlist'
            }
          ]
        };
        const resp = await service.initializeApp();
        expect(resp).toBeDefined();

        service.getCommonOptions().subscribe((response) => {
          expect(response).toBeDefined();
          expect(response).toEqual(defaultOptions, 'expected common options');
          done();
        });
      })();
  });
  // END:GET Common Option Service Test Cases

  // START:GET Outage Details Service Test Cases
  it('should get the outage based on the ens id', function (done) {
    inject([
      CommonService], async (service: CommonService) => {
        const ensId = '190T182';
        const resp = await service.initializeApp();

        expect(resp).toBeDefined();

        service.getOutageDetails(ensId).subscribe((response) => {
          expect(response).toBeDefined();
          expect(response.length).toBeGreaterThan(0);
          expect(response).toContain(jasmine.objectContaining({ 'outageId': 13123 }));
          done();
        });
      })();
  });
  // END:GET ESN Service Test Cases
  // START:GET ESN Service Test Cases
  it('should give all the ens', function (done) {
    inject([CommonService], async (service: CommonService) => {

      const resp = await service.initializeApp();

      expect(resp).toBeDefined();

      service.getEsnList().subscribe((response) => {
        expect(response).toBeDefined();
        expect(response.length).toBeGreaterThan(0);
        done();
      });
    })();
  });
  // END:GET ESN Service Test Cases
  // START:GET ESN Service Test Cases
  it('should give an error if no worflow exist for id', function (done) {
    inject([
      CommonService], async (service: CommonService) => {
        const id = 0;
        const resp = await service.initializeApp();

        expect(resp).toBeDefined();

        service.getRfrWorkflow(id).subscribe((response) => {
        }, (error) => {
          const regex = 'id: \'' + id + '\'';
          expect(error.error.toLowerCase()).toMatch(regex);
          done();
        });
      })();
  });
  // END:GET ESN Service Test Cases


  // START:Create RFR Worflow Test Cases
  it('should create a rfr workflow', function (done) {
    inject([CommonService], async (service: CommonService) => {
      // Creating mock data to be inserted for the RFR workflow
      const assignedEngineers: SSOObject[] = [{
        sso: '503055897',
        firstName: 'Devendra',
        lastName: 'Tummala',
        emailId: 'devendra.tummala@ge.com',
        name: 'Devendra Tummala'
      }];
      const workfow: Workflow = {
        'siteName': 'Test Site for Test case',
        'trainId' : 1,
        'workflowName' : 'test',
        'equipSerialNumber': '270T272',
        'outageId': 1,
        'assignedEngineers': assignedEngineers
      };
      const resp = await service.initializeApp();

      expect(resp).toBeDefined();

      service.createRfrWorkflow(workfow).subscribe((response) => {
        expect(response).toBeDefined();
        createWorkflowId = response.workflowId;
        done();
      });
    })();
  });

  it('should give error creating a rfr workflow with same ESN and Outage id', function (done) {
    inject([CommonService], async (service: CommonService) => {
      // Creating mock data to be inserted for the RFR workflow
      const assignedEngineers: SSOObject[] = [{
        sso: '503055897',
        firstName: 'Devendra',
        lastName: 'Tummala',
        emailId: 'devendra.tummala@ge.com',
        name: 'Devendra Tummala'
      }];
      const workfow: Workflow = {
        'siteName': 'Test Site for Test case',
        'trainId' : 1,
        'workflowName' : 'test',
        'equipSerialNumber': '270T272',
        'outageId': 1,
        'assignedEngineers': assignedEngineers
      };
      const resp = await service.initializeApp();

      expect(resp).toBeDefined();

      service.createRfrWorkflow(workfow).subscribe((response) => {
      }, (errorObject) => {
        expect(errorObject).toBeDefined();
        expect(errorObject.error.fields.outageId).toContain(jasmine.objectContaining({ code: 'duplicate' }));
        done();
      });
    })();
  });
  // END:Create RFR Worflow Test Cases

  it('should get a workflow detail based on id', function (done) {
    inject([CommonService], async (service: CommonService) => {
      const id = createWorkflowId;
      const resp = await service.initializeApp();

      expect(resp).toBeDefined();

      service.getRfrWorkflow(id).subscribe((response) => {
        expect(response).toBeDefined();
        expect(response['workflowId']).toEqual(id);
        done();
      });
    })(); // function returned by 'inject' has to be invoked
  });

  // START:GET RFR projects Service Test Cases
  it('should give all the rfr projects', function (done) {
    inject([
      CommonService], async (service: CommonService) => {

        const resp = await service.initializeApp();

        expect(resp).toBeDefined();

        service.getRFRProjects().subscribe((response) => {
          expect(response).toBeDefined();
          expect(response.length).toBeGreaterThan(0);
          done();
        });
      })();
  });
  // END:GET RFR projects Test Cases

  // START:Update RFR Worflow Test Cases
  it('should update a rfr workflow', function (done) {
    inject([CommonService], async (service: CommonService) => {
      // Creating mock data to be inserted for the RFR workflow

      const assignedEngineers: SSOObject[] = [
        {
          sso: '503055888',
          firstName: 'Shilpa',
          lastName: 'Kuntla',
          emailId: 'shilpa.kuntla@ge.com',
          name: 'Shilpa Kuntla'
        },
        {
          sso: '503055897',
          firstName: 'Devendra',
          lastName: 'Tummala',
          emailId: 'devendra.tummala@ge.com',
          name: 'Devendra Tummala'
        },
        {
          sso: '503055886',
          firstName: 'Priyanka',
          lastName: 'Sharma',
          emailId: 'priyanka.sharma@ge.com',
          name: 'Priyanka Sharma'
        }
      ];
      const workfow: Workflow = {
        'siteName': 'Test Site 11312312321 13123123',
        'trainId' : 1,
        'workflowName' : 'test',
        'equipSerialNumber': '270T272',
        'outageId': 1,
        'assignedEngineers': assignedEngineers
      };
      const resp = await service.initializeApp();

      expect(resp).toBeDefined();

      service.updateRfrWorkflow(workfow, createWorkflowId).subscribe((response) => {
        expect(response).toBeDefined();
        expect(response.assignedEngineers).toContain(jasmine.objectContaining({
          sso: '503055886',
          firstName: 'Priyanka',
          lastName: 'Sharma'
        }));
        expect(response.assignedEngineers).toContain(jasmine.objectContaining({
          sso: '503055897',
          firstName: 'Devendra',
          lastName: 'Tummala'
        }));
        done();
      });
    })();
  });
  // END:Update RFR Worflow Test Cases



  // START:Create new action item Test Cases
  it('should create the action items for a given workflow id', function (done) {
    inject([
      CommonService], async (service: CommonService) => {
        const workflowId = createWorkflowId;
        const actionItemData = {
          'itemTitle': 'Temporary Action items',
          'dueDate': 1528655400000,
          'category': 'START_UP_CHECKLIST',
          'owner': 'FE',
          'taskType': 'FIRST_FIRE',
          'status': 'COMPLETE'
        };
        const resp = await service.initializeApp();

        expect(resp).toBeDefined();

        service.createActionItem(workflowId, actionItemData).subscribe((response) => {
          expect(response).toBeDefined();
          expect(response.itemTitle).toEqual('Temporary Action items');
          expect(response.category).toEqual('START_UP_CHECKLIST');
          expect(response.owner).toEqual('FE');
          expect(response.taskType).toEqual('FIRST_FIRE');
          createActionItemId = response.actionItemId;
          done();
        });
      })();
  });
  // END:Create new action item Test Cases

  // START:Update action item Test Cases
  /*it('should update the action items for a given action item id', function (done) {
    inject([
      CommonService], async (service: CommonService) => {
      let actionItemId = createActionItemId;
      let actionItemData = {
             "itemTitle": "Temporary Action items Updated",
             "dueDate": 1528655400000,
             "category": "START_UP_CHECKLIST",
             "owner": "FE",
             "taskType": "FIRST_FIRE",
             "status": "COMPLETE"
};
      let resp = await service.initializeApp();

      expect(resp).toBeDefined();

      service.updateActionItem(actionItemId,actionItemData,).subscribe((response) => {
        expect(response).toBeDefined();
        expect(response['actionItemId']).toEqual(actionItemId);
        done();
      });
    })();
  }); */
  // END:Update action item Test Cases


  // START:Create new action item Test Cases
  it('should create the action item note for a given action item id', function (done) {
    inject([
      CommonService], async (service: CommonService) => {
        const actionItemId = createActionItemId;
        const actionItemNoteData = { 'content': 'new note for action item' };
        const resp = await service.initializeApp();

        expect(resp).toBeDefined();

        service.createActionItemNote(actionItemId, actionItemNoteData).subscribe((response) => {
          expect(response).toBeDefined();
          expect(response.notes).toEqual(actionItemNoteData.content);
          done();
        });
      })();
  });
  // END:Create new action item Test Cases

  // START:Get All Action Item Notes Test Cases
  it('should give all the action item Notes for a given action item id', function (done) {
    inject([
      CommonService], async (service: CommonService) => {
        const actionItemId = createActionItemId;
        const resp = await service.initializeApp();

        expect(resp).toBeDefined();

        service.getAllActionItemNotes(actionItemId).subscribe((response) => {
          expect(response).toBeDefined();
          expect(response.length).toBeGreaterThan(0);
          done();
        });
      })();
  });
  // END:Get All Action Item Notes Test Cases


  // START:Phone Line Meetings Test Cases

  it('should give the list of phone line meetings', function (done) {
    inject([
      CommonService], async (service: CommonService) => {
        const resp = await service.initializeApp();
        const workflowId = 1;
        service.getPhoneLineItemsList(workflowId).subscribe((response) => {
          expect(response).toBeDefined();
          expect(response['phoneCallDetailsDtoList'].length).toBeGreaterThan(0);
          done();
        });
      })();
  });

  it('should create phone line item', function (done) {
    inject([
      CommonService], async (service: CommonService) => {
        const resp = await service.initializeApp();
        const workflowId = 1;
        const req = { meetingLine: 'Testing Create Meeting Line1', meetingDate: service.convertDateToTimeStamp(new Date(Date.now())) };
        service.createPhoneLineItem(workflowId, req).subscribe((response) => {
          expect(response).toBeDefined();
          expect(response['meetingLine']).toEqual(req.meetingLine);
          done();
        });
      })();
  });

  it('should get phone details for specific meetingId', function (done) {
    inject([
      CommonService], async (service: CommonService) => {
        const resp = await service.initializeApp();
        const workflowId = 1;
        const meetingId = 1;
        service.getPhoneMinutes(workflowId, meetingId).subscribe((response) => {
          expect(response).toBeDefined();
          expect(response['phoneCallDetailsDtoList'][0]['meetingLine']).toEqual('Testing Create Meeting Update');
          done();
        });
      })();
  });

  it('should update phone details of specific meetingId', function (done) {
    inject([
      CommonService], async (service: CommonService) => {
        const resp = await service.initializeApp();
        const workflowId = 1;
        const meetingId = 2;
        const req = {
          'meetingId': 2,
          'meetingLine': 'Testing Create Meeting Updating',
          'meetingDate': 1529141400,
          'phoneCallMinutes': '<h1>Testing Phone Line Minutessssss</h1>',
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528344887.658,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528888447.574
          },
          'equipSerialNumber': '190T182',
          'outageId': 13123,
          'createdBy': '503055897',
          'createdDate': 1528309800,
          'modifiedBy': 'Devendra Tummala (503055897)',
          'modifiedDate': 1528888440
        };
        service.updatePhoneMinutes(workflowId, meetingId, req).subscribe((response) => {
          expect(response).toBeDefined();
          expect(response['meetingLine']).toEqual('Testing Create Meeting Updating');
          done();
        });
      })();
  });

  // END:Phone Line Meetings Test Cases



});
