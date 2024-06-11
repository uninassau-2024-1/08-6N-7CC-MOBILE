import { TestBed } from '@angular/core/testing';

import { PokemonBattleService } from './pokemon-battle.service';

describe('PokemonBattleService', () => {
  let service: PokemonBattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonBattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
