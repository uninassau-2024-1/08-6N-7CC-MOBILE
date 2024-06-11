import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { SharedDataService } from '../services/shared-pokemon.service';
import { PhotoService } from '../services/photo.service';
import { PokedexService } from '../services/pokedex.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  pokemon: any = '';
  
  comparisonResult = '';

  constructor(
    private pokeAPIService: PokeAPIService,
    public photoService: PhotoService,
    private sharedService: SharedDataService,
    private pokedexService: PokedexService
  ) {}

  ionViewWillEnter() {
    this.loadRandomPokemon();
  }

  loadRandomPokemon() {
    this.pokeAPIService.getPokemonById().subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.compareAbilities();
    });
  }

  compareAbilities() {
    const pokemonFromTab1 = this.sharedService.getPokemonFromTab1();
    if (pokemonFromTab1) {
      const tab1Abilities = pokemonFromTab1.abilities.length;
      const tab2Abilities = this.pokemon.abilities.length;

      if (tab1Abilities === tab2Abilities) {
        this.comparisonResult = 'Tie';
        this.pokedexService.addPokemon(pokemonFromTab1, 'Empate');
        this.pokedexService.addPokemon(this.pokemon, 'Empate');
      } else if (tab2Abilities > tab1Abilities) {
        this.comparisonResult = 'Tab2Wins';
        this.pokedexService.addPokemon(pokemonFromTab1, 'Perdeu');
        this.pokedexService.addPokemon(this.pokemon, 'Ganhou');
      } else {
        this.comparisonResult = 'Tab1Wins';
        this.pokedexService.addPokemon(pokemonFromTab1, 'Ganhou');
        this.pokedexService.addPokemon(this.pokemon, 'Perdeu');
      }
    }
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    var imageUrl = image.webPath;
  };

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
