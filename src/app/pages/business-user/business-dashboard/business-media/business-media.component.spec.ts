import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessMediaComponent } from './business-media.component';

describe('BusinessMediaComponent', () => {
  let component: BusinessMediaComponent;
  let fixture: ComponentFixture<BusinessMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
