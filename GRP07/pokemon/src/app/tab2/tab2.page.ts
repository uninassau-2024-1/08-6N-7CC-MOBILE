import { Component } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import { PokeAPIService } from '../services/poke-api.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  pokemon: any = {
    name: '',
    front_default: '',
    abilities: 0,
    height: '',
    weight: ''
  };
  pokemon2: any = {
    name: '',
    front_default: '',
    abilities: 0,
    height: '',
    weight: ''
  };
  comparisonResult: { color: string, text: string } = { color: '', text: '' };

  constructor(
    private sharedDataService: SharedDataService,
    private pokeAPIService: PokeAPIService,
    private photoService: PhotoService
  ) { }

  ionViewWillEnter() {
    this.pokemon = this.sharedDataService.getPokemon();
    this.buscarPokemon2();
  }

  buscarPokemon2() {
    this.pokeAPIService.getPokeAPIService()
      .subscribe((value: any) => {
        this.pokemon2.name          = value.name;
        this.pokemon2.front_default = value.sprites.other.dream_world.front_default;
        this.pokemon2.abilities     = value.abilities.length;
        this.pokemon2.height        = value.height;
        this.pokemon2.weight        = value.weight;
        this.compareAbilities();
      });
  }

  compareAbilities() {
    if (this.pokemon2.abilities === this.pokemon.abilities) {
      this.comparisonResult = { color: 'yellow', text: 'Empatou' };
      this.pokemon.draws++;
      this.pokemon2.draws++;
    } else if (this.pokemon2.abilities > this.pokemon.abilities) {
      this.comparisonResult = { color: 'green', text: 'Venceu' };
      this.pokemon.losses++;
      this.pokemon2.wins++;
    } else {
      this.comparisonResult = { color: 'red', text: 'Perdeu' };
      this.pokemon.wins++;
      this.pokemon2.losses++;
    }

    this.sharedDataService.updatePokemon(this.pokemon);
    this.sharedDataService.updatePokemon(this.pokemon2);
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}

