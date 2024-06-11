import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonBattleService {
  private pokemonPrimary: any;

  setPokemonPrimary(pokemon: any) {
    this.pokemonPrimary = pokemon;
  }

  getPokemonPrimary() {
    return this.pokemonPrimary;
  }

  constructor() { }
}
