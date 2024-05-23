import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private pokedex: any[] = [];

  addPokemon(pokemon: any, result: string) {
    const existingPokemon = this.pokedex.find(p => p.id === pokemon.id);
    if (existingPokemon) {
      if (result === 'Ganhou') {
        existingPokemon.wins += 1;
      } else if (result === 'Perdeu') {
        existingPokemon.losses += 1;
      } else if (result === 'Empate') {
        existingPokemon.draws += 1;
      }
    } else {
      this.pokedex.push({
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
        wins: result === 'Ganhou' ? 1 : 0,
        losses: result === 'Perdeu' ? 1 : 0,
        draws: result === 'Empate' ? 1 : 0,
      });
    }
  }

  getPokedex() {
    return this.pokedex;
  }
}
