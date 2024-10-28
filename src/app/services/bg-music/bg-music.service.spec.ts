import { TestBed } from '@angular/core/testing';

import { BgMusicService } from './bg-music.service';

describe('BgMusicService', () => {
  let service: BgMusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BgMusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
