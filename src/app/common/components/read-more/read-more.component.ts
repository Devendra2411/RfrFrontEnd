import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'read-more',
  template: ` <div class="read-more-conatiner">
                <div class="read-more-content" [class.collapsed]="isCollapsed">
                  <ng-content></ng-content>
                </div>
                <!--<div (click)="readMoreClick(isCollapsed)"  class="read-more-link">Read {{readLinkState}}</div>-->
              </div>`,
        styles: [`
              .read-more-conatiner{
                position: relative;
                padding-bottom: 20px;
                display: block;
              }
              .read-more-content{
                min-height: 50px;
                padding: 20px 30px;
                background-color: white;
                position: relative;
                border-radius: 6px;
                box-shadow: 1px 5px 5px #ddd;
              }

              .read-more-content:after{
                content: " ";
                height: 0;
                position: absolute;
                top: 22px;
                width: 0;
                z-index: 1;
                left: -20px;
                border: medium solid white;
                border-width: 10px 10px 10px 10px;
                border-color: transparent white transparent transparent;
              }

              div.collapsed {
                  height: 250px;
                  overflow-y: scroll;
              }
              .read-more-link{
                position: absolute;
                bottom: 0px;
                right:0;

              }
          `]
})
export class ReadMoreComponent implements OnInit {
  isCollapsed: boolean;
  readLinkState: string;

  constructor(public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.isCollapsed = false;
    this.readLinkState = 'More';
  }

  readMoreClick(isCollapsed: boolean) {
    this.isCollapsed = !this.isCollapsed;
  }

}
