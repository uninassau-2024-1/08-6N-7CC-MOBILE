import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  pokemon: any;
  pokemonName: string;
  pokemonColor: string;
  pokemonAbilitiesTab1: number;

  constructor(private http: HttpClient) {
    this.pokemon = null;
    this.pokemonName = '';
    this.pokemonColor = '';
    this.pokemonAbilitiesTab1 = 0;
  }

  ngOnInit() {
    this.pokemonAbilitiesTab1 = this.getPokemonAbilitiesFromTab1();
    this.getRandomPokemon();
  }

  activateCamera() {
    // Lógica para ativar a câmera
  }

  async getRandomPokemon() {
    const pokemonId = Math.floor(Math.random() * 100) + 1;
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).subscribe((data: any) => {
      this.pokemon = data;
      this.pokemonName = this.pokemon.name.toUpperCase();
      this.evaluatePokemonAbilities();
    });
  }

  getPokemonAbilitiesFromTab1(): number {
    // Aqui você deve implementar a lógica para obter o número de habilidades do Pokémon da tab1.
    // Este é um exemplo estático. Você deve ajustar isso conforme necessário.
    return 2; // Exemplo estático, substitua isso pela lógica real
  }

  evaluatePokemonAbilities() {
    const abilitiesTab2 = this.pokemon.abilities.length;

    if (abilitiesTab2 === this.pokemonAbilitiesTab1) {
      this.pokemonColor = 'yellow';
      this.pokemonName += ' Empate';
    } else if (abilitiesTab2 > this.pokemonAbilitiesTab1) {
      this.pokemonColor = 'red';
      this.pokemonName += ' Ganhou';
    } else {
      this.pokemonColor = 'green';
      this.pokemonName += ' Perdeu';
    }
  }
}
