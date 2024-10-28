import { TestBed } from '@angular/core/testing';

import { VisionApiService } from './vision-api.service';

describe('VisionApiService', () => {
  let service: VisionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
