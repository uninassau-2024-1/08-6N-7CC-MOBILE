import { TestBed } from '@angular/core/testing';

import { CapturedPokemonService } from './captured-pokemon.service';

describe('CapturedPokemonService', () => {
  let service: CapturedPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapturedPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
