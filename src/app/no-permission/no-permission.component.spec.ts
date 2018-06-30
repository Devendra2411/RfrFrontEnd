import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NoPermissionComponent} from './no-permission.component';

xdescribe('NoPermissionComponent', () => {
  let component: NoPermissionComponent;
  let fixture: ComponentFixture<NoPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoPermissionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPermissionComponent);
    component = fixture.componentInstance;
  });

});
