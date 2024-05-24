import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private pokedex: any[] = [];

  addPokemon(pokemon: any, result: string, fromTab1: boolean = false) {
    const existingPokemon = this.pokedex.find(p => p.id === pokemon.id);
    if (existingPokemon) {
      if (result === 'Ganhou') {
        existingPokemon.wins += 1;
      } else if (result === 'Perdeu') {
        existingPokemon.losses += 1;
      } else if (result === 'Empate') {
        existingPokemon.draws += 1;
      }
      if (fromTab1) {
        existingPokemon.fromTab1 = true;
      }
    } else {
      this.pokedex.push({
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
        wins: result === 'Ganhou' ? 1 : 0,
        losses: result === 'Perdeu' ? 1 : 0,
        draws: result === 'Empate' ? 1 : 0,
        fromTab1: fromTab1
      });
    }
  }

  getPokedex() {
    return this.pokedex.filter(pokemon => pokemon.fromTab1);
  }
}
