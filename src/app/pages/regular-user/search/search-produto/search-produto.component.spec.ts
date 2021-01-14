import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProdutoComponent } from './search-produto.component';

describe('SearchProdutoComponent', () => {
  let component: SearchProdutoComponent;
  let fixture: ComponentFixture<SearchProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
