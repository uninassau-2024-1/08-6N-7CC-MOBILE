import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeBattleService {
  private pokemonPrimary: any;

  setPokemonPrimary(pokemon: any) {
    this.pokemonPrimary = pokemon;
  }

  getPokemonPrimary() {
    return this.pokemonPrimary;
  }

  constructor() { }
}
