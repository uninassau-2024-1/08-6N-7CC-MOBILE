import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private capturedPokemonList: any[] = [];
  private pokemonSubject = new BehaviorSubject<any>(null);
  pokemon$ = this.pokemonSubject.asObservable();

  updatePokemon(pokemon: any) {
    this.pokemonSubject.next(pokemon);
    this.capturedPokemonList.push(pokemon);
  }
  constructor() { }
}
