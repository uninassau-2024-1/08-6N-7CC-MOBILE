import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private tab1Pokemon: any = null;

  setTab1Pokemon(pokemon: any) {
    this.tab1Pokemon = pokemon;
  }

  getTab1Pokemon() {
    return this.tab1Pokemon;
  }
}
