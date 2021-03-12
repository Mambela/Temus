import { TestBed } from '@angular/core/testing';

import { ExploremapService } from './exploremap.service';

describe('ExploremapService', () => {
  let service: ExploremapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploremapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
