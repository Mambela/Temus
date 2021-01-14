import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLocalComponent } from './search-local.component';

describe('SearchLocalComponent', () => {
  let component: SearchLocalComponent;
  let fixture: ComponentFixture<SearchLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
