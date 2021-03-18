import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiginSigupHeaderComponent } from './sigin-sigup-header.component';

describe('SiginSigupHeaderComponent', () => {
  let component: SiginSigupHeaderComponent;
  let fixture: ComponentFixture<SiginSigupHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiginSigupHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiginSigupHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
