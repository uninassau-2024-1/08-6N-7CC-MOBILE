import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/PokeAPI/poke-api.service';
import { PokemonService } from './../services/pokemon/pokemon.service';
import { ViewWillEnter } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, ViewWillEnter{

  pokemon1: any = {
    id: '',
    name: '',
    height: '',
    weight: '',
    abilities: ''
  }
  pokemon2: any = {
    id: '',
    name: '',
    height: '',
    weight: '',
    abilities: ''
  }
  resultadoPoke1: any;
  resultadoPoke2: any;


  constructor(
    private PokeAPIService: PokeAPIService,
    private PokemonService: PokemonService
  ) {
  }

  ngOnInit() {
    this.pokemon1 = this.PokemonService.getPokemon1();
    this.pokemon2 = this.PokemonService.getPokemon2();
    this.resultadoPoke1 = this.PokemonService.getResultadosPokemon1();
    this.resultadoPoke2 = this.PokemonService.getResultadosPokemon2();

  }

  ionViewWillEnter() {
      this.carregarPokemon();
      this.vitoria();
  }



  carregarPokemon(){
    this.pokemon1 = this.PokemonService.getPokemon1();
    this.pokemon2 = this.PokemonService.getPokemon2();
    this.resultadoPoke1 = this.PokemonService.getResultadosPokemon1();
    this.resultadoPoke2 = this.PokemonService.getResultadosPokemon2();
  }

  vitoria() {
    this.resultadoPoke1 = this.PokemonService.getResultadosPokemon1();
    this.resultadoPoke2 = this.PokemonService.getResultadosPokemon2();
  }


}
