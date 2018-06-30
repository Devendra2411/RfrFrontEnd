import {Component, OnInit} from '@angular/core';
import {BroadcastService} from '../../services/broadcast.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  spinner = true;
  errorMsgs: any[];
  serviceDown = false;

  constructor(private broadcast: BroadcastService) {
  }

  ngOnInit() {

    this.broadcast.broadcastMessages.subscribe((val) => {
      this.errorMsgs = val;
    });

    this.broadcast.serviceDown.subscribe(
      (val) => {
        this.serviceDown = val;
      }
    );

    this.broadcast.spinnerStatus.subscribe((value: boolean) => {
      setTimeout(() => {
        if (value) {
          this.spinner = true;
        } else {
          this.spinner = false;
        }
      }, 0);

    });
  }
}
