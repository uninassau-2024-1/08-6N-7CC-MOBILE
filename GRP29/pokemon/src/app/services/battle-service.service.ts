import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  opponentPokemon: any;
  battleResult: any;
  capturedPokemon: any;

  constructor() {}

  setOpponent(pokemon: any) {
    this.opponentPokemon = pokemon;
  }

  getOpponent() {
    return this.opponentPokemon;
  }

  setResult(result: string) {
    this.battleResult = result;
  }

  getResult() {
    return {
      battleResult: this.battleResult,
      capturedPokemon: this.capturedPokemon,
    };
  }

  setCapturedPokemon(pokemon: any) {
    this.capturedPokemon = pokemon;
  }

  getCapturedPokemon() {
    return this.capturedPokemon;
  }
}
