import { Component } from '@angular/core';
import { Pokemon } from '../model/pokemon';
import { ViewDidEnter } from '@ionic/angular';
import { PokemonService } from '../services/pokemon.service';
import { Util } from '../util/util';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements ViewDidEnter {

  pokemons: Pokemon[] = [];
  pokemonsPaginados: Pokemon[] = [];
  paginaAtual: number = 1;
  qtdPokemonPorPagina: number = 2;

  constructor(
    private pokemonService: PokemonService,
    private util: Util
  ) {}

  ionViewDidEnter(): void {
    this.meusPokemons()
  }

  meusPokemons() {
    this.pokemonService.meusPokemons().subscribe((pokemons) => {
      if (pokemons.length > 0) {
        this.pokemons = pokemons;
        this.paginarPokemons();
      } else {
        this.util.mostrarMensagem('Você não possui nenhum pokemon', 'warning' );
      }
    });
  }

  paginarPokemons() {
    const startIndex = (this.paginaAtual - 1) * this.qtdPokemonPorPagina;
    const endIndex = startIndex + this.qtdPokemonPorPagina;
    this.pokemonsPaginados = this.pokemons.slice(startIndex, endIndex);
  }

  proximaPagina() {
    if ((this.paginaAtual * this.qtdPokemonPorPagina) < this.pokemons.length) {
      this.paginaAtual++;
      this.paginarPokemons();
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.paginarPokemons();
    }
  }


}
