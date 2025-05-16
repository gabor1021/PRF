import { TestBed } from '@angular/core/testing';

import { GdateService } from './gdate.service';

describe('GdateService', () => {
  let service: GdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
