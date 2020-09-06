import { TestBed } from '@angular/core/testing';

import { AddressesServiceService } from './addresses-service.service';

describe('AddressesServiceService', () => {
  let service: AddressesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
