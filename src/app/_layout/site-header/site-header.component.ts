import {Component, OnInit} from '@angular/core';

import {BroadcastService} from '../../services/broadcast.service';

@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  alertObject: { show: boolean, msg: string, title: string, type: string };

  constructor(private broadcast: BroadcastService) {
  }

  ngOnInit() {
    this.broadcast.alertStatus.subscribe((val) => {
      this.alertObject = val;
    });
  }

}
