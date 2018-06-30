import {RouterModule, Routes} from '@angular/router';

import {RFRWorkflowComponent} from './rfr-workflow/rfr-workflow.component';

import {CreateWorkflowComponent} from './create-workflow/create-workflow.component';

import {NgxPermissionsGuard} from 'ngx-permissions';

import {NoPermissionComponent} from './no-permission/no-permission.component';

import {MyBreadcrumbsResolver} from './common/classes/breadcrumb-resolver';

import {ActionItemComponent} from './action-item/action-item.component';
import { PhoneMeetingsComponent } from './phone-meetings/phone-meetings.component';
import { PhoneCallMinutesComponent } from './phone-call-minutes/phone-call-minutes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [

  {
    path: 'rfrWorkflow', data: {breadcrumbs: true, text: 'RFR Workflow'},
    children: [
      {path: '', component: RFRWorkflowComponent},
      {
        path: ':id/actionItem', component: ActionItemComponent,
        data: {
          breadcrumbs: 'Action Items',
          permissions: {
            only: ['ROLE_WORKFLOW_VIEW'],
            redirectTo: 'noPermission'
          }
        },
        canActivate: [NgxPermissionsGuard],
        children: [{path: '', component: ActionItemComponent}]
      },
      {
        path: 'workflow', component: CreateWorkflowComponent,
        data: {
          breadcrumbs: MyBreadcrumbsResolver,
        },
        canActivate: [NgxPermissionsGuard]
      },
      {
        path: 'workflow/:id', component: CreateWorkflowComponent,
        data: {
          breadcrumbs: MyBreadcrumbsResolver,
        },
        canActivate: [NgxPermissionsGuard]
      },

      {
        path: ':id/meetinglines',
        data: {
          breadcrumbs: 'Phone Line Items',
        },
        canActivate: [NgxPermissionsGuard],
        children: [{path: '', component: PhoneMeetingsComponent},
                  {path: 'minutes', component: PhoneCallMinutesComponent,
                  data: {
                    breadcrumbs: 'Phone Call Minutes',
                  }}
                  ]
      }


    ]
  },

  {path: 'noPermission', component: NoPermissionComponent},
  {path: '404', component: PageNotFoundComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: 'rfrWorkflow'}
];
export const routing = RouterModule.forRoot(appRoutes);
