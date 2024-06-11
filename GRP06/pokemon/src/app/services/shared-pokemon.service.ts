import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private pokemonFromTab1: any = null;

  setPokemonFromTab1(pokemon: any) {
    this.pokemonFromTab1 = pokemon;
  }

  getPokemonFromTab1() {
    return this.pokemonFromTab1;
  }
}
