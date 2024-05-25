import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private pokemons: any[] = [];

  constructor() { }

  setPokemon(data: any) {
    const existingPokemon = this.pokemons.find(pokemon => pokemon.name === data.name);
    if (existingPokemon) {
      Object.assign(existingPokemon, data);
    } else {
      this.pokemons.push(data);
    }
  }

  getPokemon() {
    return this.pokemons.length > 0 ? this.pokemons[this.pokemons.length - 1] : null;
  }

  addPokemon(pokemon: any) {
    this.pokemons.push(pokemon);
  }

  getPokemons() {
    return this.pokemons;
  }

  updatePokemon(updatedPokemon: any) {
    const index = this.pokemons.findIndex(pokemon => pokemon.name === updatedPokemon.name);
    if (index !== -1) {
      this.pokemons[index] = updatedPokemon;
    }
  }

  getLastPokemon() {
    return this.pokemons.length > 0 ? this.pokemons[this.pokemons.length - 1] : null;
  }
}

