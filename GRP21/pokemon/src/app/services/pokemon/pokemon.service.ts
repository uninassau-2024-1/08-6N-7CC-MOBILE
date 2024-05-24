import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemon1: any = {
    id: '',
    name: '',
    height: '',
    weight: '',
    abilities: ''
  };

  private pokemon2: any = {
    id: '',
    name: '',
    height: '',
    weight: '',
    abilities: ''
  };

  private resultadosPokemon1 = {
    vitoria: 0,
    derrota: 0,
    empate: 0
  }

  private resultadosPokemon2 = {
    vitoria: 0,
    derrota: 0,
    empate: 0
  };

  setPokemon1(pokemon: any) {
    this.pokemon1 = pokemon;
  }

  getPokemon1() {
    return this.pokemon1;
  }

  setPokemon2(pokemon: any) {
    this.pokemon2 = pokemon;
  }

  getPokemon2() {
    return this.pokemon2;
  }


  resetPokemon1Res() {
    this.resultadosPokemon1 = {
      vitoria: 0,
      derrota: 0,
      empate: 0
    }
  }

  getResultadosPokemon1() {
    return this.resultadosPokemon1;
  }

  getResultadosPokemon2() {
    return this.resultadosPokemon2;
  }

  setResultadosPokemon1(resultado: any) {
    this.resultadosPokemon1 = resultado
  }

  setResultadosPokemon2(resultado: any) {
    this.resultadosPokemon2 = resultado
  }

  constructor() { }
}
