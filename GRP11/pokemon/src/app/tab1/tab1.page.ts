// tab1.page.ts
import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = '52011210'; // Declare the property here
  areaBusca: any = {}; // Declare the areaBusca property here

  pokemonData: any = {}; // Initialize an empty object
  

  constructor(private pokemonService: PokemonService) {
    this.buscarPokemon();
  }

  buscarPokemon() {
    this.pokemonService.buscarPokemon();
    this.pokemonData = this.pokemonService.getPokemonData(); // Get the Pokémon data
    this.areaBusca = this.pokemonService.getAreaBusca(); // Get the CEP data 
  }
  
  calcularSomaHabilidadesData(){
    return this.pokemonService.calcularSomaHabilidadesData();
  }
}
