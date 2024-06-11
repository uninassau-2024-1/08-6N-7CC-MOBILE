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
  constructor(private http: HttpClient) {}
  private readonly baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

  getPokeAPIService(
    apiUrl = `${this.baseUrl}${Math.floor(
      Math.random() * 100
    )}`
  ): Observable<any> {
    return this.http.get<any>(apiUrl);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
