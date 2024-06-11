import { TestBed } from '@angular/core/testing';

import { BattleServiceService } from './battle-service.service';

describe('BattleServiceService', () => {
  let service: BattleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
