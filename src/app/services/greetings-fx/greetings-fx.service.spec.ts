import { TestBed } from '@angular/core/testing';

import { GreetingsFxService } from './greetings-fx.service';

describe('GreetingsFxService', () => {
  let service: GreetingsFxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreetingsFxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
