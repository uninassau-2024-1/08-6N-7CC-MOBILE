import { TestBed } from '@angular/core/testing';

import { PokeBattleService } from './poke-battle.service';

describe('PokeBattleService', () => {
  let service: PokeBattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeBattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
