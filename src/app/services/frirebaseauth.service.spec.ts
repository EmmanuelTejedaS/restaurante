import { TestBed } from '@angular/core/testing';

import { FrirebaseauthService } from './frirebaseauth.service';

describe('FrirebaseauthService', () => {
  let service: FrirebaseauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrirebaseauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
