import { Component } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { ViaCepService } from '../services/via-cep.service';
import { ToastController, ViewDidEnter } from '@ionic/angular';
import { Pokemon } from '../model/pokemon';
import { PokemonService } from '../services/pokemon.service';
import { AreaBusca } from '../model/area-busca';
import { Util } from '../util/util';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements  ViewDidEnter {
  areaBuscarPokemon!: string;

  areaBusca!: AreaBusca;
  endereco!: string;
  pokemon!: Pokemon | null;
  pokemons: Pokemon[] = [];

  constructor(
    private pokeApiService: PokeApiService,
    private cepService: ViaCepService,
    private pokemonService: PokemonService,
    private util: Util
  ) {}
  ionViewDidEnter(): void {
    this.meusPokemons()
  }

  buscarPokemon(cep: string) {
    this.buscarCep();
  }

  buscarCep(){
    this.cepService.getViaCEPService(this.areaBuscarPokemon).subscribe(
      (retorno: any) => {
        if (retorno.erro) {
          this.util.mostrarMensagem('CEP Não Encontrado!', 'warning');
        } else {
          this.areaBusca = {
            bairro: JSON.parse(JSON.stringify(retorno))['neighborhood'],
            localidade: JSON.parse(JSON.stringify(retorno))['city'],
            logradouro: JSON.parse(JSON.stringify(retorno))['neighborhood'],
            uf: JSON.parse(JSON.stringify(retorno))['state'],
          };
          this.encontrarPokemon();

        }
      },
      (error: any) => {
        this.buscarCepAlternativo();
      }
    );
  }

  buscarCepAlternativo(){
    this.cepService.getBrasilCEPService(this.areaBuscarPokemon).subscribe(
      (retorno: any) => {
        debugger
        if (retorno.erro) {
          this.util.mostrarMensagem('CEP Não Encontrado!', 'warning');
        } else {
          this.areaBusca = {
            bairro: JSON.parse(JSON.stringify(retorno))['bairro'],
            localidade: JSON.parse(JSON.stringify(retorno))['localidade'],
            logradouro: JSON.parse(JSON.stringify(retorno))['logradouro'],
            uf: JSON.parse(JSON.stringify(retorno))['uf'],
          };
          this.encontrarPokemon();

        }
      },
      (error: any) => {
        this.util.mostrarMensagem('Cep digitado de forma incorreta!', 'danger');
      }
    );
  }

  encontrarPokemon(){
    let id = 0;
    if(this.pokemon){
      let id = Math.floor(Math.random() * 100)
      if(this.pokemon.idPokemon === id){
        if(id === 100){
          id--;
        }else{
          id++
        }
      }
    }
    this.pokeApiService.getPokeAPI(id).subscribe((pokemon: any) => {
      if (this.areaBusca) {
        this.pokemon = {
          idPokemon: pokemon.id,
          abilities: pokemon.abilities.length,
          height: pokemon.height,
          weight: pokemon.weight,
          nome: pokemon.name,
          url: pokemon.sprites.other.dream_world.front_default,
          urlPixelado: pokemon.sprites.front_shiny,
          qtdDerrota: 0,
          qtdVitoria: 0,
          qtdEmpate: 0,
        }
      }
    });
  }

  capturarPokemon(){
    if(this.pokemons.length > 0){
      this.pokemons.forEach(pokemon => {
        if(pokemon.idPokemon === this.pokemon?.idPokemon){
          this.util.mostrarMensagem('Você já capturou esse pokemon!', 'warning');
          this.pokemon = null;
        }
      });
    }
    if(this.pokemon){

    this.pokemonService.capturarPokemon(this.pokemon).subscribe(()=>{
      this.util.mostrarMensagem('Pokemon Capturado', 'success');
      this.pokemon = null
    },(error: any) => {
      this.util.mostrarMensagem('Erro ao capturar Pokemon', 'danger');
    })
  }else{
    this.encontrarPokemon();
  }

  }

  meusPokemons() {
    this.pokemonService.meusPokemons().subscribe((pokemons) => {
      if (pokemons.length > 0) {
        this.pokemons = pokemons;
      }
    });
  }

  naoQueroOPokemon(){
    this.encontrarPokemon();
  }

  onInput(ev: any){
    let input = ev.target.value;

    input = input.replace(/\D/g, '');

    if (input.length === 8) {
      input = input.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }
    this.areaBuscarPokemon = input;
    ev.target.value = this.areaBuscarPokemon;
  }

}
