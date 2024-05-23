import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { SharedService } from '../services/shared.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  pokemon: any = null;
  resultText: string = '';
  resultColor: string = '';

  constructor(private pokeAPIService: PokeAPIService,
    public photoService:PhotoService, private sharedService: SharedService) {}
  
  
  addPhotoToGallery(){
    this.photoService.addNewToGallery();
  }

  ngOnInit() {
    this.loadRandomPokemon();
  }

  ionViewWillEnter() {
    this.loadRandomPokemon();
  }

  loadRandomPokemon() {
    this.pokeAPIService.getPokemonById().subscribe(pokemon => {
      this.pokemon = pokemon;
      this.comparePokemonAbilities();
    });
  }

  comparePokemonAbilities() {
    const tab1Pokemon = this.sharedService.getTab1Pokemon();
    if (tab1Pokemon) {
      const tab1Abilities = tab1Pokemon.abilities.length;
      const tab2Abilities = this.pokemon.abilities.length;

      if (tab1Abilities === tab2Abilities) {
        this.resultText = 'Empate';
        this.resultColor = 'yellow';
      } else if (tab2Abilities > tab1Abilities) {
        this.resultText = 'Ganhou';
        this.resultColor = 'red';
      } else {
        this.resultText = 'Perdeu';
        this.resultColor = 'green';
      }
    }
  }
}
