import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessEventsComponent } from './business-events.component';

describe('BusinessEventsComponent', () => {
  let component: BusinessEventsComponent;
  let fixture: ComponentFixture<BusinessEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
