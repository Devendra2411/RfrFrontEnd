import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionItemTimelineComponent } from './action-item-timeline.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {GrowlModule} from 'primeng/growl';
import {CheckboxModule} from 'primeng/checkbox';
import {ProgressBarModule} from 'primeng/progressbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {SidebarModule} from 'primeng/sidebar';
import {MatBadgeModule} from '@angular/material/badge';
import {FileUploadModule} from 'primeng/fileupload';
import { FilelengthPipe } from '../common/pipes/filelength.pipe';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DatePipe,APP_BASE_HREF } from '@angular/common';
import {ItemAttachmentComponent} from '../item-attachment/item-attachment.component';
import {CommonService} from '../services/common.service';
import {BroadcastService} from '../services/broadcast.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {NgxPermissionsModule} from 'ngx-permissions';

import {Observable} from 'rxjs/Observable';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';

describe('ActionItemTimelineComponent', () => {
  let component: ActionItemTimelineComponent;
  let fixture: ComponentFixture<ActionItemTimelineComponent>;
  let commonService: CommonService;
  let toastr: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionItemTimelineComponent,ItemAttachmentComponent,FilelengthPipe ],
      imports : [
        BrowserModule, FormsModule,GrowlModule,ProgressBarModule,CheckboxModule,
        ConfirmDialogModule,SidebarModule,MatBadgeModule,FileUploadModule,RouterTestingModule,
          HttpClientModule, NgxPermissionsModule.forRoot(), ToastrModule.forRoot({
            timeOut: 3000,
            preventDuplicates: true
          }), BrowserAnimationsModule, ReactiveFormsModule,
      ],
      providers: [BroadcastService,ConfirmationService,
        CommonService,
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
    fixture = TestBed.createComponent(ActionItemTimelineComponent);
    component = fixture.componentInstance;
    commonService = fixture.debugElement.injector.get(CommonService);
    toastr = fixture.debugElement.injector.get(ToastrService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(commonService, 'getAllActionItemNotes').and.returnValue(Observable.of([
      {
        'notesId': 9,
        'notes': 'new note',
        'actionItemId': 52,
        'changeTracking': {
          'createdBy': {
            'sso': '503055897',
            'firstName': 'Devendra',
            'lastName': 'Tummala'
          },
          'createdDate': 1528794206.502000000,
          'modifiedBy': {
            'sso': '503055897',
            'firstName': 'Devendra',
            'lastName': 'Tummala'
          },
          'modifiedDate': 1528794206.502000000
        }
      }
    ]));
    spyOn(commonService, 'createActionItemNote').and.returnValue(Observable.of({
      'notesId': 10,
      'notes': 'new note for testing',
      'actionItemId': 52,
      'changeTracking': {
        'createdBy': {
          'sso': '503055897',
          'firstName': 'Devendra',
          'lastName': 'Tummala'
        },
        'createdDate': 1528794882.500000000,
        'modifiedBy': {
          'sso': '503055897',
          'firstName': 'Devendra',
          'lastName': 'Tummala'
        },
        'modifiedDate': 1528794882.500000000
      }
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('should initialize the component with the selected action item data', () => {
    const actionItemData = {
      'actionItemId': 52,
      'itemTitle': 'Intial task for this workflow',
      'dueDate': 1528793900.557000000,
      'levelValue': 1,
      'status': 'COMPLETE',
      'category': 'START_UP_CHECKLIST',
      'owner': 'FE',
      'taskType': 'FIRST_FIRE',
      'changeTracking': {
        'createdBy': {
          'sso': '503055897',
          'firstName': 'Devendra',
          'lastName': 'Tummala'
        },
        'createdDate': 1528793900.557000000,
        'modifiedBy': {
          'sso': '503055897',
          'firstName': 'Devendra',
          'lastName': 'Tummala'
        },
        'modifiedDate': 1528793900.557000000
      },
      'uploadedFiles':[],
      'workflowId': 1
    };
    const actionItemNoteResp = [
      {
        'notesId': 9,
        'notes': 'new note',
        'actionItemId': 52,
        'changeTracking': {
          'createdBy': {
            'sso': '503055897',
            'firstName': 'Devendra',
            'lastName': 'Tummala'
          },
          'createdDate': 1528794206.502000000,
          'modifiedBy': {
            'sso': '503055897',
            'firstName': 'Devendra',
            'lastName': 'Tummala'
          },
          'modifiedDate': 1528794206.502000000
        }
      }
    ];
    
    component.initActionTimeline();
    commonService.updateActionitemData(actionItemData);
    component.actionItem = actionItemData;
    actionItemNoteResp.forEach(r => {
        (r['changeTracking']['createdDate'] as any) = commonService.dateTimeFormatter(r.changeTracking.createdDate);
        (r['changeTracking']['modifiedDate'] as any) = commonService.dateFormatter(r.changeTracking.modifiedDate);
    });
    expect(component.timelineObj).toBeDefined();
    expect(component.timelineObj).toEqual(actionItemNoteResp.reverse());
  });

  it('should create an action item note on submit', () => {
    const formData = {'content': 'new note for testing'};
    component.actionItem = {
      'actionItemId': 52,
      'itemTitle': 'Intial task for this workflow',
      'dueDate': 1528793900.557000000,
      'levelValue': 1,
      'status': 'COMPLETE',
      'category': 'START_UP_CHECKLIST',
      'owner': 'FE',
      'taskType': 'FIRST_FIRE',
      'changeTracking': {
        'createdBy': {
          'sso': '503055897',
          'firstName': 'Devendra',
          'lastName': 'Tummala'
        },
        'createdDate': 1528793900.557000000,
        'modifiedBy': {
          'sso': '503055897',
          'firstName': 'Devendra',
          'lastName': 'Tummala'
        },
        'modifiedDate': 1528793900.557000000
      },
      'uploadedFiles':[],
      'workflowId': 1
    };
    component.actionTimelineForm = new FormGroup({
      content: new FormControl('new note for testing', Validators.required)
    });

    component.onSubmit(component.actionTimelineForm);

    expect(component.timelineObj[0]['notes']).toEqual(formData.content);
  });


});
