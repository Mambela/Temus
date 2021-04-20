import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogedHeaderComponent } from './loged-header.component';

describe('LogedHeaderComponent', () => {
  let component: LogedHeaderComponent;
  let fixture: ComponentFixture<LogedHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogedHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
