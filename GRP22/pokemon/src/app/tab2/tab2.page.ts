import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../services/pokedex.service';
import { PokeBattleService } from '../services/poke-battle.service';
import { PokeAPIService } from '../services/poke-api.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  adversaryPokemon: any = {
    name: '',
    abilities: 0,
    height: 0,
    weight: 0,
    imageURL: ''
  }
  pokemonPrimary: any;
  resultText: string = '';
  resultColor: string = '';

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private pokeBattleService: PokeBattleService,
    public pokedexService: PokedexService
  ) {}

  ionViewWillEnter() {
    this.pokemonPrimary = this.pokeBattleService.getPokemonPrimary();
    this.searchOpposingPokemon();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  searchOpposingPokemon() {
    this.pokeAPIService.getPokeAPIService()
      .subscribe((pokemon) => {
        let pokemonData = JSON.parse(JSON.stringify(pokemon));
        this.adversaryPokemon.name = pokemonData.name;
        this.adversaryPokemon.abilities = pokemonData.abilities.length;
        this.adversaryPokemon.height = pokemonData.height;
        this.adversaryPokemon.weight = pokemonData.weight;
        this.adversaryPokemon.imageURL = pokemonData.sprites.other.dream_world.front_default;
        
        if (this.adversaryPokemon.abilities === this.pokemonPrimary.abilities) {
          this.resultText = 'Draws';
          this.resultColor = 'yellow';
          this.updateScore('draws');
        } else if (this.adversaryPokemon.abilities > this.pokemonPrimary.abilities) {
          this.resultText = 'Won';
          this.resultColor = 'green';
          this.updateScore('defeats');
        } else {
          this.resultText = 'Lost';
          this.resultColor = 'red';
          this.updateScore('victories');
        }

      });
  }

  updateScore(result: 'victories' | 'defeats' | 'draws') {
    let pokemonInPokedex = this.pokedexService.getPokemonFromPokedex(this.pokemonPrimary.name);
    if (pokemonInPokedex) {
      pokemonInPokedex[result] += 1;
    }
  }
  
}
