import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `<div class="container">
    <div class="ui-g ui-fluid">
        <div class="ui-g-12 ui-md-12">
            <div class="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div class="error-details">
                    Sorry, an error has occured, Requested page not found!
                </div>
                <div class="error-actions">
                    <a routerLink="/rfrWorkflow" class="btn btn-primary btn-lg"><span class="fa fa-home"></span>
                        Take Me Home </a>
                </div>
            </div>
        </div>
    </div>
</div>`,
styles: [`.error-template {padding: 40px 15px;text-align: center;}
.error-actions {margin-top:15px;margin-bottom:15px;}
.error-actions .btn { margin-right:10px; }`]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
