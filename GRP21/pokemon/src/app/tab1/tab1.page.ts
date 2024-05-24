import { PokemonService } from './../services/pokemon/pokemon.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { PokeAPIService } from '../services/PokeAPI/poke-api.service';
import { ViaCepService } from '../services/ViaCEP/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon : string = '52020212';
  idPokemon : number =  0;

  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  };
  pokemon1: any = {
    id: '',
    name: '',
    height: '',
    weight: '',
    abilities: ''
  }
  resultadosPokemon1: any = {
    vitoria: 0,
    derrota: 0,
    empate: 0
  };

;


  constructor(
    private PokeAPIService: PokeAPIService,
    private ViaCepService: ViaCepService,
    private PokemonService: PokemonService
  ) {}

savePokemon1() {
  this.PokemonService.setPokemon1(this.pokemon1)
  console.log(this.pokemon1)
}


  buscarPokemon() {
    this.ViaCepService.getViaCEPService(this.areaBuscarPokemon).subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value)) ['logradouro'];
      this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value)) ['bairro'];
      this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value)) ['localidade'];
      this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value)) ['uf'];
    });



  }
  buscarPokemonApi() {
    this.testar()
    this.PokeAPIService.getPokeAPIService().subscribe((value) =>{
      this.pokemon1.id = JSON.parse(JSON.stringify(value)) ['id'];
      this.pokemon1.name = JSON.parse(JSON.stringify(value)) ['name'];
      this.pokemon1.abilities = JSON.parse(JSON.stringify(value)) ['abilities'];
      this.pokemon1.height = JSON.parse(JSON.stringify(value)) ['height'];
      this.pokemon1.weight = JSON.parse(JSON.stringify(value)) ['weight'];


      this.savePokemon1()

      });
  }

  testar() {
    this.PokemonService.resetPokemon1Res();

    this.resultadosPokemon1 = this.PokemonService.getResultadosPokemon1();

    console.log(this.PokemonService.getResultadosPokemon1());
    console.log(this.PokemonService.getResultadosPokemon2());
  }




}
