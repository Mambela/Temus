import { TestBed } from '@angular/core/testing';

import { CategoriaDataServiceService } from './categoria-data-service.service';

describe('CategoriaDataServiceService', () => {
  let service: CategoriaDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
