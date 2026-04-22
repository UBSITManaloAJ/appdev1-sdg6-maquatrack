import { TestBed } from '@angular/core/testing';

import { WaterData } from './water-data';

describe('WaterData', () => {
  let service: WaterData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
