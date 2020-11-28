import { TestBed } from '@angular/core/testing';

import { RegistrationMapService } from './registration-map.service';

describe('RegistrationMapService', () => {
  let service: RegistrationMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
