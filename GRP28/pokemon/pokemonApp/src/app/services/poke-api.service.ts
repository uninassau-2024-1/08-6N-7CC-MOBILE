import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private httpClient: HttpClient) { }

  getPokeAPI(id: number): any{
    if( id === 0){
      id = Math.floor(Math.random() * 100);
    }
    return this.httpClient.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }

}
