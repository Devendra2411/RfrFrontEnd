import {Component, OnInit} from '@angular/core';
import {NgxPermissionsService} from 'ngx-permissions';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'site-navbar',
  templateUrl: './site-navbar.component.html',
  styleUrls: ['./site-navbar.component.css']
})
export class SiteNavbarComponent implements OnInit {
  username: any;
  status: any;
  sbstatus: any;

  constructor(private commonService: CommonService, private permissionsService: NgxPermissionsService) {
  }

  ngOnInit() {
    const value = this.commonService.commonWhoAmi.value;
    this.username = value['lastName'] + ' , ' + value['firstName'];
    const perm = value['roles'];
    this.permissionsService.loadPermissions(perm);

  }
}
