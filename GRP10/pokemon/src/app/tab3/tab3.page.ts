import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  pokemons: any[] = [];

  constructor(public pokeApiService: PokeAPIService) { }

  ngOnInit() {
    this.loadPokemonData();
  }

  loadPokemonData() {
    this.pokeApiService
      .getPokeAPIService('https://pokeapi.co/api/v2/pokemon?limit=100')
      .subscribe((data: any) => {
        const results = data.results;

        results.forEach((pokemon: any) => {
          this.pokeApiService
            .getPokemonDetails(pokemon.url)
            .subscribe((details: any) => {
              this.pokemons.push({
                name: details.name,
                front_default: details.sprites.front_default,
                wins: 0, // Valores iniciais
                losses: 0,
                draws: 0,
              });
            });
        });
      });
  }
}
