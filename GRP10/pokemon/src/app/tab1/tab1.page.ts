import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  areaBuscarPokemon: string = '';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  }

  pokemon: any = {
    name: '',
    front_default: '',
    abilities: '',
    height: '',
    weight: '',
    wins: 0,
    losses: 0,
    draws: 0
  }

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private sharedDataService: SharedDataService
  ) { }

  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value: any) => {
        this.areaBusca.logradouro = value.logradouro;
        this.areaBusca.bairro     = ', ' + value.bairro;
        this.areaBusca.localidade = ' - ' + value.localidade;
        this.areaBusca.uf         = '-' + value.uf;
      });

    this.pokeAPIService.getPokeAPIService()
      .subscribe((value: any) => {
        const newPokemon = {
          name:          value.name,
          front_default: value.sprites.other.dream_world.front_default,
          abilities:     value.abilities.length,
          height:        value.height,
          weight:        value.weight,
          wins: 0,
          losses: 0,
          draws: 0
        };

        this.sharedDataService.addPokemon(newPokemon);
        this.pokemon = newPokemon;
      });
  }

  getLastPokemon() {
    return this.sharedDataService.getLastPokemon();
  }
}
