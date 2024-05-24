import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { SharedService } from '../services/shared.service';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemom: string = '54705283';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: '',
  };
  pokemon: any = null;

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private sharedService: SharedService,
    private pokedexService: PokedexService
  ) {}

  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemom).subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
      this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
      this.areaBusca.localidade = JSON.parse(JSON.stringify(value))['localidade'];
      this.areaBusca.uf = JSON.parse(JSON.stringify(value))['uf'];
    });
    
    this.pokeAPIService.getPokemonById().subscribe(pokemon => {
      this.pokemon = pokemon;
      this.sharedService.setTab1Pokemon(pokemon);
      this.pokedexService.addPokemon(pokemon,'',true); // Exemplo de captura, resultado pode variar
    });
  }
}
