import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiginModalComponent } from './sigin-modal.component';

describe('SiginModalComponent', () => {
  let component: SiginModalComponent;
  let fixture: ComponentFixture<SiginModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiginModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
