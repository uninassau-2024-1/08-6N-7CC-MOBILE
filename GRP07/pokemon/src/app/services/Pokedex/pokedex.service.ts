import { Injectable } from '@angular/core';
import { PokeAPIService } from '../PokeAPI/poke-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  addPokemon(capturedPokemon: { nome: any; img: any; vitorias: number; derrotas: number; empates: number; }) {
    throw new Error('Method not implemented.');
  }

  dexPokemons: any[] = [];
  index: number = 0;

  constructor(
    private httpClient: HttpClient,

  ) { }

  getPokeAPIServiceJson(id: number){
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }

  
  guardarPokemon(id: number){ 

    let dexPokemon = {
      nome: '',
      img: '',
      vitorias: 0,
      derrotas: 0,
      empates: 0,
    }

    this.getPokeAPIServiceJson(id).subscribe((value) => {
      dexPokemon.nome = JSON.parse(JSON.stringify(value)) ['name'];
      dexPokemon.img = JSON.parse(JSON.stringify(value)) ['id'];
    });

    this.regDexPokemon(dexPokemon)
  }

  regDexPokemon(dexPokemon: object){
    this.resetCombates()
    this.dexPokemons.push(dexPokemon)
    console.log(this.dexPokemons)
  }
  

  somaEmpate(){
    this.dexPokemons[this.index].empates++;
  }

  somaVitoria(){
    this.dexPokemons[this.index].vitorias++;
  }
    
  somaDerrota(){
    this.dexPokemons[this.index].derrotas++;
  }

  resetCombates(){
    if(this.dexPokemons[0] != undefined){
      this.index++
    }
  }

}