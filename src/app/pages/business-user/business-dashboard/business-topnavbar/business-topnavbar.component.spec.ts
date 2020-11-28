import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTopnavbarComponent } from './business-topnavbar.component';

describe('BusinessTopnavbarComponent', () => {
  let component: BusinessTopnavbarComponent;
  let fixture: ComponentFixture<BusinessTopnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessTopnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessTopnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
