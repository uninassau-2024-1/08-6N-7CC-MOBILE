// tab3.page.ts
import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  pokedexData: any[] = []; // Initialize an array to hold Pokédex data

  constructor(private pokemonService: PokemonService) {
    // Retrieve saved Pokémon data from the service
    this.pokedexData = this.pokemonService.getPokedex();
  }
}
