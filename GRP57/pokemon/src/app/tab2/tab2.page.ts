import { PokemonService } from './../services/pokemon/pokemon.service';
import { PhotoService } from './../services/Photo/photo.service';
import { Component, Input } from '@angular/core';
import { PokeAPIService } from '../services/PokeAPI/poke-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  vitoria = false;
  empate = false;
  derrota = false;

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
  };
  resultadosPokemon1: any = {
    vitoria: 0,
    derrota: 0,
    empate: 0
  };

  resultadosPokemon2: any = {
    vitoria: 0,
    derrota: 0,
    empate: 0
  };

  constructor(public PhotoService: PhotoService,
    private PokeAPIService: PokeAPIService,
    private PokemonService: PokemonService
  ) {
    this.buscarPokemonApi()
  }

  savePokemon2() {
    this.PokemonService.setPokemon2(this.pokemon2)
    console.log(this.pokemon2)
  }


  buscarPokemonApi() {
    this.PokeAPIService.getPokeAPIService().subscribe((value) =>{
      this.pokemon2.id = JSON.parse(JSON.stringify(value)) ['id'];
      this.pokemon2.name = JSON.parse(JSON.stringify(value)) ['name'];
      this.pokemon2.abilities = JSON.parse(JSON.stringify(value)) ['abilities'];
      this.pokemon2.height = JSON.parse(JSON.stringify(value)) ['height']
      this.pokemon2.weight = JSON.parse(JSON.stringify(value)) ['weight']

      this.savePokemon2()

      });
  }

  addPhotoToGallery() {
    this.PhotoService.addNewToGallery();
  }


  compararPokemons() {
    this.pokemon1 = this.PokemonService.getPokemon1();
    this.resultadosPokemon1 = this.PokemonService.getResultadosPokemon1();


    console.log('Habilidades do Pokémon 1:', this.pokemon1.abilities);
    console.log('Habilidades do Pokémon 2:', this.pokemon2.abilities);

    if(this.pokemon1.abilities.length > this.pokemon2.abilities.length) {
      this.resultadosPokemon1.vitoria++;
      this.resultadosPokemon2.derrota++;
      console.log(this.resultadosPokemon1)

      this.vitoria = false;
      this.derrota = true;
      this.empate = false;


    } else if(this.pokemon1.abilities.length < this.pokemon2.abilities.length) {
      this.resultadosPokemon1.derrota++;
      this.resultadosPokemon2.vitoria++;

      this.vitoria = true;
      this.derrota = false;
      this.empate = false;

    } else{
      this.resultadosPokemon1.empate++;
      this.resultadosPokemon2.empate++;
      console.log(this.resultadosPokemon1)

      this.vitoria = false;
      this.derrota = false;
      this.empate = true;

    }

    this.PokemonService.setResultadosPokemon1(this.resultadosPokemon1);
    this.PokemonService.setResultadosPokemon2(this.resultadosPokemon2);

  }

  compareAbilities() {

    if (this.pokemon1.abilities.length < this.pokemon2.abilities.length) {

    } else if (this.pokemon1.abilities.length > this.pokemon2.abilities.length) {

      this.vitoria = false;
      this.derrota = true;
      this.empate = false;

    } else {

      this.vitoria = false;
      this.derrota = false;
      this.empate = true;
    }
  }


  }


