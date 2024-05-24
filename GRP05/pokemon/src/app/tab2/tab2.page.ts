import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  pokemon: any = {
    name: '',
    front_default: '',
    abilities: '',
    height: '',
    weight: ''
  };

  tab1PokemonAbilities: number = 0; // Ability count from Tab1
  battleResult: string = '';

  constructor(
    private pokeAPIService: PokeAPIService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.pokemon$.subscribe(tab1Pokemon => {
      if (tab1Pokemon) {
        this.tab1PokemonAbilities = tab1Pokemon.abilities;
        this.getRandomPokemon();
      }
    });
  }

  getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1; // There are 898 Pokémon in PokeAPI
    this.pokeAPIService.getPokeAPIService(randomId).subscribe((value) => {
      this.pokemon.name = JSON.parse(JSON.stringify(value))['name'];
      this.pokemon.front_default = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default'];
      this.pokemon.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
      this.pokemon.height = JSON.parse(JSON.stringify(value))['height'];
      this.pokemon.weight = JSON.parse(JSON.stringify(value))['weight'];
      this.evaluateBattle();
    });
  }

  evaluateBattle() {
    if (this.pokemon.abilities === this.tab1PokemonAbilities) {
      this.battleResult = 'Empate';
    } else if (this.pokemon.abilities > this.tab1PokemonAbilities) {
      this.battleResult = 'Ganhou';
    } else {
      this.battleResult = 'Perdeu';
    }
  }

  getBattleResultColor() {
    if (this.battleResult === 'Empate') {
      return 'yellow';
    } else if (this.battleResult === 'Ganhou') {
      return 'red';
    } else {
      return 'green';
    }
  }
}
