import { TestBed } from '@angular/core/testing';

import { SearchResultDataService } from './search-result-data.service';

describe('SearchResultDataService', () => {
  let service: SearchResultDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchResultDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
