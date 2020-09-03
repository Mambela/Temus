import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopMapComponent } from './pop-map.component';

describe('PopMapComponent', () => {
  let component: PopMapComponent;
  let fixture: ComponentFixture<PopMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
