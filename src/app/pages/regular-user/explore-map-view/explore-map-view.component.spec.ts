import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreMapViewComponent } from './explore-map-view.component';

describe('ExploreMapViewComponent', () => {
  let component: ExploreMapViewComponent;
  let fixture: ComponentFixture<ExploreMapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
