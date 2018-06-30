import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpErrorResponse} from '@angular/common/http';
import { PhoneMeetingsComponent } from './phone-meetings.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'primeng/sidebar';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, MultiSelectModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BroadcastService} from '../services/broadcast.service';

describe('PhoneMeetingsComponent', () => {
  let component: PhoneMeetingsComponent;
  let fixture: ComponentFixture<PhoneMeetingsComponent>;
  let commonService: CommonService;
  let toastr: ToastrService;
  const route = {url: new BehaviorSubject([{path: 'createWorkflow'}]), params: new BehaviorSubject({id: 1})};
  let errorSimulation = false;
  let broadcastService: BroadcastService;
  let fb: FormBuilder;
  let spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneMeetingsComponent],
      imports: [FormsModule, NgxPermissionsModule.forRoot(), TableModule,
        RouterTestingModule, ReactiveFormsModule,
        HttpClientModule, ToastrModule.forRoot({
            timeOut: 3000,
            preventDuplicates: true
          }), SidebarModule, CalendarModule, MultiSelectModule, BrowserAnimationsModule],
      providers: [CommonService, ToastrService, FormBuilder,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: ActivatedRoute, useValue: route}, DatePipe, BroadcastService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneMeetingsComponent);
    component = fixture.componentInstance;
    commonService = fixture.debugElement.injector.get(CommonService);
    broadcastService = fixture.debugElement.injector.get(BroadcastService);
    fb = fixture.debugElement.injector.get(FormBuilder);
    toastr = fixture.debugElement.injector.get(ToastrService);
    const getPhoneLineListResp = {
      'equipSerialNumber': '190T182',
      'siteName': 'test123',
      'phoneCallDetailsDtoList': [
        {
          'meetingId': 8,
          'meetingLine': 'Testing After Dto Changes',
          'meetingDate': 1528322760.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528798025.989000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528798047.115000000
          }
        },
        {
          'meetingId': 9,
          'meetingLine': 'jakgfddddddddddddddddddddddddddddddddddddddddddddddddd',
          'meetingDate': 1528805640.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528805848.660000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528806581.897000000
          }
        },
        {
          'meetingId': 11,
          'meetingLine': 'Testing Test Cases',
          'meetingDate': 1528874599.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528874622.090000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528874622.090000000
          }
        },
        {
          'meetingId': 12,
          'meetingLine': 'Testing 2',
          'meetingDate': 1528875240.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528875252.607000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528875252.607000000
          }
        },
        {
          'meetingId': 13,
          'meetingLine': 'Testinggg',
          'meetingDate': 1528875401.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528875469.960000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528875469.960000000
          }
        },
        {
          'meetingId': 14,
          'meetingLine': 'Testing Update',
          'meetingDate': 1528875594.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528875612.158000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528875612.158000000
          }
        },
        {
          'meetingId': 15,
          'meetingLine': 'Testing Obj',
          'meetingDate': 1528875720.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528875734.204000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528875734.204000000
          }
        },
        {
          'meetingId': 16,
          'meetingLine': 'Test Unshift',
          'meetingDate': 1528875858.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528875869.410000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528875869.410000000
          }
        },
        {
          'meetingId': 17,
          'meetingLine': 'Testing Rea',
          'meetingDate': 1528875904.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528875938.870000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528875938.870000000
          }
        },
        {
          'meetingId': 4,
          'meetingLine': 'Testing Time',
          'meetingDate': 1528438814.940000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528435014.984000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528445677.419000000
          }
        },
        {
          'meetingId': 5,
          'meetingLine': 'Testing After Formatter',
          'meetingDate': 1529094286.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528446319.789000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528446319.789000000
          }
        },
        {
          'meetingId': 6,
          'meetingLine': 'Testing Date Time',
          'meetingDate': 1528713021.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528453855.606000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528453855.606000000
          }
        },
        {
          'meetingId': 7,
          'meetingLine': 'Testing Dates After Navigators\n',
          'meetingDate': 1355231280.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528463360.332000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528463441.322000000
          }
        },
        {
          'meetingId': 2,
          'meetingLine': 'Test Meeting Line Create After Path Param',
          'meetingDate': 1528914600.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528365591.076000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528780782.374000000
          }
        },
        {
          'meetingId': 3,
          'meetingLine': 'Testing For Presentation',
          'meetingDate': 1528434360.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528434438.479000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528781033.901000000
          }
        },
        {
          'meetingId': 1,
          'meetingLine': 'Testing Create Meeting ',
          'meetingDate': 1528450200.000000000,
          'changeTracking': {
            'createdBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'createdDate': 1528344887.658000000,
            'modifiedBy': {
              'sso': '503055897',
              'firstName': 'Devendra',
              'lastName': 'Tummala'
            },
            'modifiedDate': 1528797657.109000000
          }
        }
      ]
    };
    spyOn(commonService, 'getPhoneLineItemsList').and.callFake(function() {
      return Observable.from([getPhoneLineListResp]);
    });

    const error = new HttpErrorResponse({
      status: 400,
      error: {
        'type': 'generic',
        'global': [],
        'fields': {
          'meetingLine': [
            {
              'code': 'generic',
              'message': 'Field \'MEETING LINE\' may not be empty.'
            }
          ]
        }
      }
    });
    const respForCreate = {
      'meetingId': 12,
      'meetingLine': 'Testing 2',
      'meetingDate': 1528875240,
      'changeTracking': {
        'createdBy': {
          'sso': '503055897',
          'firstName': 'Devendra',
          'lastName': 'Tummala'
        },
        'createdDate': 1528875252.607,
        'modifiedBy': {
          'sso': '503055897',
          'firstName': 'Devendra',
          'lastName': 'Tummala'
        },
        'modifiedDate': 1528875252.607
      }
    };
    if (errorSimulation) {
      spy = spyOn(commonService, 'createPhoneLineItem').and.returnValue(Observable.throwError(error));
    } else {
      spy = spyOn(commonService, 'createPhoneLineItem').and.returnValue(Observable.from([respForCreate]));
    }

    component.createLineItemForm = fb.group({
      meetingLine: fb.control('', Validators.required),
      meetingDate: fb.control('', Validators.required)
    });

    fixture.detectChanges();
  });
  afterEach(() => {
    spy = null;
  });


  it('checking createPhoneLineItem', () => {
    component.createLineItemForm.get('meetingDate').setValue(new Date);
    component.createLineItemForm.get('meetingLine').setValue('Test Case For Create');
    component.createPhoneLineItem();
    expect(component.displayCreate).toEqual(false);
    expect(toastr.previousToastMessage).toEqual('Created Phone Line Item Successfully');
    errorSimulation = true;
  });


  it('checking createPhoneLineItem  error condition', () => {
    component.createLineItemForm.get('meetingDate').setValue(new Date);
    component.createLineItemForm.get('meetingLine').setValue('Test Case For Create');
    broadcastService.broadcastMessages.next('Field \'MEETING LINE\' may not be empty.' as any);
    component.createPhoneLineItem();
    expect(component.errorForMeetingLine).toEqual('Field \'MEETING LINE\' may not be empty.');
    errorSimulation = false;
  });

  it('checking ngOnInit', () => {
      const getPhoneLineListResp = {
        'equipSerialNumber': '190T182',
        'siteName': 'test123',
        'phoneCallDetailsDtoList': [
          {
            'meetingId': 8,
            'meetingLine': 'Testing After Dto Changes',
            'meetingDate': 1528322760.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528798025.989000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528798047.115000000
            }
          },
          {
            'meetingId': 9,
            'meetingLine': 'jakgfddddddddddddddddddddddddddddddddddddddddddddddddd',
            'meetingDate': 1528805640.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528805848.660000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528806581.897000000
            }
          },
          {
            'meetingId': 11,
            'meetingLine': 'Testing Test Cases',
            'meetingDate': 1528874599.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528874622.090000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528874622.090000000
            }
          },
          {
            'meetingId': 12,
            'meetingLine': 'Testing 2',
            'meetingDate': 1528875240.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528875252.607000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528875252.607000000
            }
          },
          {
            'meetingId': 13,
            'meetingLine': 'Testinggg',
            'meetingDate': 1528875401.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528875469.960000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528875469.960000000
            }
          },
          {
            'meetingId': 14,
            'meetingLine': 'Testing Update',
            'meetingDate': 1528875594.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528875612.158000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528875612.158000000
            }
          },
          {
            'meetingId': 15,
            'meetingLine': 'Testing Obj',
            'meetingDate': 1528875720.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528875734.204000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528875734.204000000
            }
          },
          {
            'meetingId': 16,
            'meetingLine': 'Test Unshift',
            'meetingDate': 1528875858.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528875869.410000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528875869.410000000
            }
          },
          {
            'meetingId': 17,
            'meetingLine': 'Testing Rea',
            'meetingDate': 1528875904.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528875938.870000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528875938.870000000
            }
          },
          {
            'meetingId': 4,
            'meetingLine': 'Testing Time',
            'meetingDate': 1528438814.940000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528435014.984000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528445677.419000000
            }
          },
          {
            'meetingId': 5,
            'meetingLine': 'Testing After Formatter',
            'meetingDate': 1529094286.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528446319.789000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528446319.789000000
            }
          },
          {
            'meetingId': 6,
            'meetingLine': 'Testing Date Time',
            'meetingDate': 1528713021.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528453855.606000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528453855.606000000
            }
          },
          {
            'meetingId': 7,
            'meetingLine': 'Testing Dates After Navigators\n',
            'meetingDate': 1355231280.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528463360.332000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528463441.322000000
            }
          },
          {
            'meetingId': 2,
            'meetingLine': 'Test Meeting Line Create After Path Param',
            'meetingDate': 1528914600.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528365591.076000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528780782.374000000
            }
          },
          {
            'meetingId': 3,
            'meetingLine': 'Testing For Presentation',
            'meetingDate': 1528434360.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528434438.479000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528781033.901000000
            }
          },
          {
            'meetingId': 1,
            'meetingLine': 'Testing Create Meeting ',
            'meetingDate': 1528450200.000000000,
            'changeTracking': {
              'createdBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'createdDate': 1528344887.658000000,
              'modifiedBy': {
                'sso': '503055897',
                'firstName': 'Devendra',
                'lastName': 'Tummala'
              },
              'modifiedDate': 1528797657.109000000
            }
          }
        ]
      };
      expect(component.workflowId).toEqual(1);
      expect(component.lineItemsData.length).toBeGreaterThan(0);
      expect(component.esnID).toEqual(getPhoneLineListResp.equipSerialNumber);
  });
});
