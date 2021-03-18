import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigupModalComponent } from './sigup-modal.component';

describe('SigupModalComponent', () => {
  let component: SigupModalComponent;
  let fixture: ComponentFixture<SigupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
