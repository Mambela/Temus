import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEventoComponent } from './search-evento.component';

describe('SearchEventoComponent', () => {
  let component: SearchEventoComponent;
  let fixture: ComponentFixture<SearchEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
