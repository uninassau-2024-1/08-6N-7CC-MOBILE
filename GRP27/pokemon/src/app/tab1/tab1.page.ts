import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { PokemonBattleService } from '../services/pokemon-battle.service';
import { PokedexService } from '../services/pokedex.service'; 

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
    vitorias: 0,
    derrotas: 0,
    empates: 0
  }

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private pokemonBattleService: PokemonBattleService,
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
        this.pokemonBattleService.setPokemonPrimary(this.pokemon);
        let pokemonCapturado = JSON.parse(JSON.stringify(this.pokemon));
        if (!this.pokedexService.getPokemonFromPokedex(pokemonCapturado.name)) {
          this.pokedexService.addToPokedex(pokemonCapturado);
        }
      });
  }

}
