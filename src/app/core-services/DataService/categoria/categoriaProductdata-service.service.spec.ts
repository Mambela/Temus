import { TestBed } from '@angular/core/testing';

import { CategoriaProductService } from './categoriaProductdata-service.service';

describe('CategoriaProductService', () => {
  let service: CategoriaProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
