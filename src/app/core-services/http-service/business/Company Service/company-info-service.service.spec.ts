import { TestBed } from '@angular/core/testing';

import { CompanyInfoServiceService } from './company-info-service.service';

describe('CompanyInfoServiceService', () => {
  let service: CompanyInfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyInfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
