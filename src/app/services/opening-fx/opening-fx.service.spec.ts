import { TestBed } from '@angular/core/testing';

import { OpeningFxService } from './opening-fx.service';

describe('OpeningFxService', () => {
  let service: OpeningFxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeningFxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
