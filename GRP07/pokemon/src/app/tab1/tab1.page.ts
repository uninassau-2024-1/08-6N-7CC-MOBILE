import { Component } from '@angular/core';
import { PokeAPIService } from '../services/PokeAPI/poke-api.service';
import { ViaCEPService } from '../services/ViaCEP/via-cep.service';

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
    logradouro: '',
    uf: ''
  };

  pokemon: any = {
    nome: '',
    img: '',
    habilidade: '',
    altura: '',
    peso: ''
  }

  constructor(
    private pokeAPIService: PokeAPIService,
    private ViaCEPService: ViaCEPService,
  ) {}


  buscarPokemon(){
    this.ViaCEPService.getViaCEPService(this.areaBuscarPokemon).subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value)) ['logradouro'];
      this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value)) ['bairro'];
      this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value)) ['localidade'];
      this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value)) ['uf'];
    });

    this.pokeAPIService.getPokeAPIService().subscribe((value) => {
      this.pokemon.nome = JSON.parse(JSON.stringify(value)) ['name'];
      this.pokemon.img = JSON.parse(JSON.stringify(value)) ['id'];
      this.pokemon.habilidade = (JSON.parse(JSON.stringify(value)) ['abilities']).length -1;
      this.pokemon.altura = JSON.parse(JSON.stringify(value)) ['height'];
      this.pokemon.peso = JSON.parse(JSON.stringify(value)) ['weight'];
    });

    this.pokeAPIService.setTab1Habilidade(parseInt(this.pokemon.habilidade));
    let pokemon = {name: this.pokemon.name, image: this.pokemon.sprites.front_default}
    
    
  }

}