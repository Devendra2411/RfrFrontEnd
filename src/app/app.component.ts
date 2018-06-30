import {Component} from '@angular/core';
import {CommonService} from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RFR Red Flag Revision';

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.getCommonOptions().subscribe((options) => {
      this.commonService.commonData.next(options as any);
    });
  }
}
