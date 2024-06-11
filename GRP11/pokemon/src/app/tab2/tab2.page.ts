import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokemonService } from '../services/pokemon.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  constructor(public photoService: PhotoService, private pokemonService: PokemonService) {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.batalhaPokemon(); // Call buscarPokemon() when the page is about to enter the view
  }

  areaBusca: any = {}; // Declare the areaBusca property here

  pokemonBattle: any = {}; // Initialize an empty object

batalhaPokemon() {
    this.pokemonService.batalhaPokemon();
    this.pokemonBattle = this.pokemonService.getPokemonBattle(); // Get the Pokémon data

  }

  calcularSomaHabilidadesBattle(){
    return this.pokemonService.calcularSomaHabilidadesBattle();
  }
  statusBattle(){
      return this.pokemonService.statusBattle;
  }
  pokemonNameColor(){
    return this.pokemonService.getPokemonNameColor();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

}

