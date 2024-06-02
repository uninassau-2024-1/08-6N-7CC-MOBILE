// pokemon.service.ts
import { Injectable } from '@angular/core';
import { PokeAPIService } from './poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  areaBuscarPokemon: string = '52011210';

   // Add a property to store the list of saved Pokémon
   private pokedex: any[] = [];

  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  };
  pokemonData: any = {
    name: '',
    abilities: [],
    height: 0,
    weight: 0,
    imageUrl: '', // Add imageUrl property
    victories: 0,
    draws: 0,
    defeats: 0
  };
  
  pokemonBattle: any = {
    name: '',
    abilities: [],
    height: 0,
    weight: 0,
    imageUrl: '', // Add imageUrl property
    victories: 0,
    draws: 0,
    defeats: 0
  };


  constructor(private pokeAPIService: PokeAPIService, private viaCEPService: ViaCEPService) {}

  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon).subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
      this.areaBusca.bairro = ',' + JSON.parse(JSON.stringify(value))['bairro'];
      this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
      this.areaBusca.uf = ' - ' + JSON.parse(JSON.stringify(value))['uf'];
    });

    // Fetch Pokémon data
    this.pokeAPIService.getPokeAPIService().subscribe((pokemon: any) => {
      this.pokemonData.name = pokemon.name;
      this.pokemonData.abilities = pokemon.abilities.map((ability: any) => ability.ability.name);
      this.pokemonData.height = pokemon.height;
      this.pokemonData.weight = pokemon.weight;
      this.pokemonData.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`; // Set the image URL
    });
    
    if (this.statusBattle === 'Vitória') {
      this.pokemonData.victories++;
      this.pokemonBattle.defeats++;
     } else if (this.statusBattle === 'Empate') {
       this.pokemonData.draws++;
       this.pokemonBattle.draws++;
     } else if (this.statusBattle === 'Derrota') {
       this.pokemonData.defeats++;
       this.pokemonBattle.victories++;
     }
      this.savePokemonToPokedex(this.pokemonData);
    
  }

  batalhaPokemon(){
        this.pokeAPIService.getPokeAPIService().subscribe((pokemon: any) => {
        this.pokemonBattle.name = pokemon.name;
        this.pokemonBattle.abilities = pokemon.abilities.map((ability: any) => ability.ability.name);
        this.pokemonBattle.height = pokemon.height;
        this.pokemonBattle.weight = pokemon.weight;
        this.pokemonBattle.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`; // Set the image URL
      });

        if (this.statusBattle === 'Vitória') {
         this.pokemonBattle.victories++;
         this.pokemonData.defeats++;
        } else if (this.statusBattle === 'Empate') {
          this.pokemonBattle.draws++;
          this.pokemonData.draws++;
        } else if (this.statusBattle === 'Derrota') {
          this.pokemonBattle.defeats++;
          this.pokemonData.victories++;
        }

        this.savePokemonToPokedex(this.pokemonBattle);
  
}
  
  statusBattle : string = '';
  getPokemonNameColor() {
    if(this. calcularSomaHabilidadesBattle() > this.calcularSomaHabilidadesData()){
        this.statusBattle = 'Vitória';
       return 'green';
      } else if (this.calcularSomaHabilidadesBattle() == this.calcularSomaHabilidadesData()){
        this.statusBattle = 'Empate';
       return 'yellow';
      }else{
        this.statusBattle = 'Derrota';
        return 'red';
      }
  }

  getPokemonData() {
    return this.pokemonData;
  }
  getAreaBusca(){
    return this.areaBusca;
  }

  getPokemonBattle() {
    return this.pokemonBattle;
  }

  // Calcula a soma das três habilidades
  calcularSomaHabilidadesData() {
    const somaHabilidades = this.pokemonData.abilities.reduce((total: number, habilidade: string) => {
      return total + habilidade.length;
    }, 0);
    return somaHabilidades;
  }
    // Calcula a soma das três habilidades
    calcularSomaHabilidadesBattle() {
        const somaHabilidades = this.pokemonBattle.abilities.reduce((total: number, habilidade: string) => {
          return total + habilidade.length;
        }, 0);
        return somaHabilidades;
      }

        // Verifica se um Pokémon já está na Pokédex
  isPokemonInPokedex(pokemon: any): boolean {
    return this.pokedex.some((p) => p.name === pokemon.name);
  }

  // Salva um Pokémon na Pokédex
  savePokemonToPokedex(pokemon: any) {
    // Verifica se o Pokémon já está na Pokédex antes de salvar
    if (!this.isPokemonInPokedex(pokemon)) {
      this.pokedex.push(pokemon);
    }
  }

    // Get the list of saved Pokémon for display in the Pokédex
    getPokedex() {
      return this.pokedex;
    }
}
