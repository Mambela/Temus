import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnathenticatedNavBarComponent } from './unathenticated-nav-bar.component';

describe('UnathenticatedNavBarComponent', () => {
  let component: UnathenticatedNavBarComponent;
  let fixture: ComponentFixture<UnathenticatedNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnathenticatedNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnathenticatedNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
