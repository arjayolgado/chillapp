import { TestBed } from '@angular/core/testing';

import { ButtonFxService } from './button-fx.service';

describe('ButtonFxService', () => {
  let service: ButtonFxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonFxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
