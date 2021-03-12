import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutofiltersComponent } from './produtofilters.component';

describe('ProdutofiltersComponent', () => {
  let component: ProdutofiltersComponent;
  let fixture: ComponentFixture<ProdutofiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutofiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutofiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
