import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalOptionComponent } from './local-option.component';

describe('LocalOptionComponent', () => {
  let component: LocalOptionComponent;
  let fixture: ComponentFixture<LocalOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
