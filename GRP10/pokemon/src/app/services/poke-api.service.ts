import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeAPIService {
  public pokemonMeu: any = {
    abilities: '',
    front_default: '',
    heigth: '',
    name: '',
    weigth: '',
  };
  public pokemonPokedex: any = [];
  // private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100';
  // private apiUrl = `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 100 )}`;

  constructor(private http: HttpClient) {}

  getPokeAPIService(
    apiUrl = `https://pokeapi.co/api/v2/pokemon/${Math.floor(
      Math.random() * 100
    )}`
  ): Observable<any> {
    return this.http.get<any>(apiUrl);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
