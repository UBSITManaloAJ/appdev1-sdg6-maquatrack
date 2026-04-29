import { TestBed } from '@angular/core/testing';

import { Fitness } from './fitness';

describe('Fitness', () => {
  let service: Fitness;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fitness);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
