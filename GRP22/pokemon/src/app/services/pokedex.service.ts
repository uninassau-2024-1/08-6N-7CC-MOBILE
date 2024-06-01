import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private pokedex: any[] = [];

  addToPokedex(pokemon: any) {
    this.pokedex.push(pokemon);
  }

  getPokedex() {
    return this.pokedex;
  }

  getPokemonFromPokedex(name: string) {
    return this.pokedex.find(pokemon => pokemon.name === name);
  }
  
  constructor() { }
}


