import { TestBed } from '@angular/core/testing';

import { CategoriadataServiceService } from './categoriadata-service.service';

describe('CategoriadataServiceService', () => {
  let service: CategoriadataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriadataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
