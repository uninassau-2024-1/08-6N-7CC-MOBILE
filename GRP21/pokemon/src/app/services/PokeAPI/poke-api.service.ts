import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  constructor(private HttpClient: HttpClient) { }
  getPokeAPIService (id: number = Math.floor(Math.random() * 100)) {
    return this.HttpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }
}


// Math.floor(Math.random() * 100) (Colocar no number)
