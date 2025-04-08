import { TestBed } from '@angular/core/testing';

import { DrillingActsService } from './drilling-acts.service';

describe('DrillingActsService', () => {
  let service: DrillingActsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrillingActsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
