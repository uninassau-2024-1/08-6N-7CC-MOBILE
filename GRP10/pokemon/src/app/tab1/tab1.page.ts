import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = '';
  areaBusca: any = {
    bairro: '',
    lacolidade: '',
    logradouro: '',
    uf: ''
  };

  constructor(
    public pokeAPIService: PokeAPIService,
    public viaCEPService: ViaCEPService,
    private http: HttpClient
  ) { }

  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value) => {
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
        this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
        this.areaBusca.lacolidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
        this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))['uf'];

      });
    this.pokeAPIService.getPokeAPIService()
      .subscribe((value) => {
        this.pokeAPIService.pokemonMeu.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokeAPIService.pokemonMeu.front_default = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default'];
        this.pokeAPIService.pokemonMeu.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokeAPIService.pokemonMeu.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokeAPIService.pokemonMeu.weight = JSON.parse(JSON.stringify(value))['weight'];
      });
    this.pokeAPIService.pokemonPokedex.push(this.pokeAPIService.pokemonMeu);
    console.log(this.pokeAPIService.pokemonPokedex)
  }
}
