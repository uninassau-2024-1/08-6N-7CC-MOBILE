import { Component, ChangeDetectorRef } from '@angular/core';
import { CapturedPokemonService } from '../services/captured-pokemon.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  pokemonList: any[] = [];

  constructor(
    private capturedPokemonService: CapturedPokemonService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ionViewDidEnter() {
    this.carregarPokemon();
  }

  carregarPokemon() {
    this.pokemonList = [];

    this.capturedPokemonService.getCapturedPokemons().forEach((pokemons) => {
      if (pokemons) {
        const pokemon = JSON.parse(pokemons);
        const name = pokemon.name;
        const image = pokemon.image;
        const vitorias = pokemon.vitorias;
        const derrotas = pokemon.derrotas;
        const empates = pokemon.empates;
        this.pokemonList.push({ name, image, vitorias, derrotas, empates });
      }
    });
    this.changeDetectorRef.detectChanges();
  }
}
