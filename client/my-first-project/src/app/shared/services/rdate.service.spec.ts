import { TestBed } from '@angular/core/testing';

import { RdateService } from './rdate.service';

describe('RdateService', () => {
  let service: RdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
