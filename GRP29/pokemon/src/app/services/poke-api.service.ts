import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapturedPokemonService } from './captured-pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class PokeAPIService {
  capturedPokemon: any;

  constructor(
    private httpClient: HttpClient,
    private capturedPokemonService: CapturedPokemonService
  ) {}

  getPokeAPIService(tab: string, id: number = Math.floor(Math.random() * 100)) {
    if (tab === 'tab1') {
      this.httpClient
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .subscribe((data: any) => {
          this.capturedPokemonService.saveCapturedPokemon(data);
        });
    }
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
