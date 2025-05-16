import { TestBed } from '@angular/core/testing';

import { PrefService } from './pref.service';

describe('PrefService', () => {
  let service: PrefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
