import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { PokemonBattleService } from '../services/pokemon-battle.service';
import { PokedexService } from '../services/pokedex.service'; 

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  pokemonAdversario: any = {
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
    private pokemonBattleService: PokemonBattleService,
    public pokedexService: PokedexService
  ) {}

  ionViewWillEnter() {
    this.pokemonPrimary = this.pokemonBattleService.getPokemonPrimary(); // Inicialize pokemonPrimary
    this.buscarPokemonAdversario();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  buscarPokemonAdversario() {
    this.pokeAPIService.getPokeAPIService()
      .subscribe((pokemon) => {
        let pokemonData = JSON.parse(JSON.stringify(pokemon));
        this.pokemonAdversario.name = pokemonData.name;
        this.pokemonAdversario.abilities = pokemonData.abilities.length;
        this.pokemonAdversario.height = pokemonData.height;
        this.pokemonAdversario.weight = pokemonData.weight;
        this.pokemonAdversario.imageURL = pokemonData.sprites.other.dream_world.front_default;
        
        if (this.pokemonAdversario.abilities === this.pokemonPrimary.abilities) {
          this.resultText = 'Empate';
          this.resultColor = 'yellow';
          this.updateScore('empates');
        } else if (this.pokemonAdversario.abilities > this.pokemonPrimary.abilities) {
          this.resultText = 'Ganhou';
          this.resultColor = 'green';
          this.updateScore('derrotas');
        } else {
          this.resultText = 'Perdeu';
          this.resultColor = 'red';
          this.updateScore('vitorias');
        }

      });
  }

  updateScore(result: 'vitorias' | 'derrotas' | 'empates') {
    let pokemonInPokedex = this.pokedexService.getPokemonFromPokedex(this.pokemonPrimary.name);
    if (pokemonInPokedex) {
      pokemonInPokedex[result] += 1;
    }
  }
  
}
