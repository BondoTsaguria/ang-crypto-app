import { TestBed } from '@angular/core/testing';

import { TrendingCurrencyService } from './trending-currency.service';

describe('TrendingCurrencyService', () => {
  let service: TrendingCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendingCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
