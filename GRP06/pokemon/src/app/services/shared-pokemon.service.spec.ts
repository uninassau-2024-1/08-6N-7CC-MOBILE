import { TestBed } from '@angular/core/testing';

import { SharedPokemonService } from './shared-pokemon.service';

describe('SharedPokemonService', () => {
  let service: SharedPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
