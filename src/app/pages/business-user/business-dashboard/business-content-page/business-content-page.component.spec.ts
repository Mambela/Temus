import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessContentPageComponent } from './business-content-page.component';

describe('BusinessContentPageComponent', () => {
  let component: BusinessContentPageComponent;
  let fixture: ComponentFixture<BusinessContentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessContentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
