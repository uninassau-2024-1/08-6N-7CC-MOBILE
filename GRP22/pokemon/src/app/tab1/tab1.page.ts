import { Component } from '@angular/core';
import { PokeBattleService } from '../services/poke-battle.service';
import { ViaCEPService } from '../services/via-cep.service';
import { PokedexService } from '../services/pokedex.service';
import { PokeAPIService } from '../services/poke-api.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro:'',
    uf: ''
  };
  
  pokemon: any = {
    name: '',
    abilities: 0,
    height: 0,
    weight: 0,
    imageURL: '',
    victories: 0,
    defeats: 0,
    draws: 0
  }

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private pokeBattleService: PokeBattleService,
    private pokedexService: PokedexService
  ) {}
  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value) => {
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
        this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
        this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
        this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))['uf'];
      });
    this.pokeAPIService.getPokeAPIService()
      .subscribe((pokemon) => {
        let pokemonData = JSON.parse(JSON.stringify(pokemon));
        this.pokemon.name = pokemonData.name;
        this.pokemon.abilities = pokemonData.abilities.length;
        this.pokemon.height = pokemonData.height;
        this.pokemon.weight = pokemonData.weight;
        this.pokemon.imageURL = pokemonData.sprites.other.dream_world.front_default;
        this.pokeBattleService.setPokemonPrimary(this.pokemon);
        let capturedPokemon = JSON.parse(JSON.stringify(this.pokemon));
        if (!this.pokedexService.getPokemonFromPokedex(capturedPokemon.name)) {
          this.pokedexService.addToPokedex(capturedPokemon);
        }
      });
  }

}
