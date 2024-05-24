import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {
  capturedPokemon: any[] = [];
  pokemon: any = {
    name: '',
    front_default: '',
    abilities: '',
    height: '',
    weight: ''
  };
  constructor(
    private pokeAPIService: PokeAPIService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    // Não é necessário carregar um Pokémon específico aqui
    this.sharedService.pokemon$.subscribe(pokemonList => {
      if (pokemonList) {
        this.capturedPokemon = pokemonList;
      }
    });
  }



}
