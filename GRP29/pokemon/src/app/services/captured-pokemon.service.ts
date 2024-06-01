import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CapturedPokemonService {
  capturedPokemons: any = {
    name: '',
    image: '',
    vitorias: 0,
    derrotas: 0,
    empates: 0,
  };

  constructor() {}

  saveCapturedPokemon(pokemon: any) {
    const pokemonName = JSON.parse(JSON.stringify(pokemon))['name'];

    if (!localStorage.getItem(pokemonName)) {
      this.capturedPokemons.name = pokemonName;
      this.capturedPokemons.image = JSON.parse(JSON.stringify(pokemon))[
        'sprites'
      ]['front_default'];

      localStorage.setItem(
        this.capturedPokemons.name,
        JSON.stringify(this.capturedPokemons)
      );
    }
  }

  setPokemonResult(pokemonResult: any) {
    const pokemonData = localStorage.getItem(
      pokemonResult.capturedPokemon.name
    );
    const result = pokemonResult.battleResult;

    if (pokemonData) {
      const myPokemon = JSON.parse(pokemonData);

      if (result === 'Ganhou') {
        myPokemon.vitorias = myPokemon.vitorias + 1;
      } else if (result === 'Perdeu') {
        myPokemon.derrotas = myPokemon.derrotas + 1;
      } else {
        myPokemon.empates = myPokemon.empates + 1;
      }
      const newPokemonData = JSON.stringify(myPokemon);
      localStorage.setItem(pokemonResult.capturedPokemon.name, newPokemonData);
    }
  }

  getCapturedPokemons() {
    const capturedPokemons = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        capturedPokemons.push(localStorage.getItem(key));
      }
    }
    return capturedPokemons;
  }
}
