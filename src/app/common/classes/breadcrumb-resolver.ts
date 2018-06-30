import {Injectable} from '@angular/core';
import {McBreadcrumbsResolver} from 'ngx-breadcrumbs';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Breadcrumb} from '../interfaces/breadcrumb-interface';
import {NgxPermissionsService} from 'ngx-permissions';

@Injectable()
export class MyBreadcrumbsResolver extends McBreadcrumbsResolver {

  // Optional: inject any required dependencies
  constructor(private permission: NgxPermissionsService) {
    super();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const permissions = this.permission.getPermissions();

    const hasCreateAccess: boolean = this._hasAccess(permissions, 'ROLE_WORKFLOW_CREATE');
    const hasViewAccess: boolean = this._hasAccess(permissions, 'ROLE_WORKFLOW_VIEW');

    const myCrumbs: Breadcrumb[] = [];

    if (hasCreateAccess) {
      if (route.params['id']) {
        myCrumbs.push({
          text: 'Edit Workflow',
          path: super.getFullPath(route.parent) + '/'
        });
      } else {
        myCrumbs.push({
          text: 'Create Workflow',
          path: super.getFullPath(route.parent) + '/'
        });
      }
    } else if (hasViewAccess) {
      if (route.params['id']) {
        myCrumbs.push({
          text: 'View Workflow',
          path: super.getFullPath(route.parent) + '/'
        });
      } else {
        myCrumbs.push({
          text: 'No Permission',
          path: super.getFullPath(route.parent) + '/'
        });
      }
    }

    // Note: the resolve method can return any of the following types:
    //
    //   * IBreadcrumb[]
    //   * Observable<IBreadcrumb[]>
    //   * Promise<IBreadcrumb>

    return myCrumbs;
  }

  _hasAccess(permissions, access: string) {
    const permissionList = Object.keys(permissions);
    return (permissionList.indexOf(access) !== -1) ? true : false;
  }
}
