import { Component, ChangeDetectorRef } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { BattleService } from '../services/battle-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  areaBuscarPokemon: string = '';
  message: string = '';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: '',
  };
  capturedPokemon: any = {
    name: '',
    weight: '',
    height: '',
    abilities: '',
    image: '',
  };

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private changeDetectorRef: ChangeDetectorRef,
    private battleService: BattleService
  ) { }
  buscarPokemon() {
    this.areaBusca = {
      bairro: '',
      localidade: '',
      logradouro: '',
      uf: '',
    };
    if (this.areaBuscarPokemon) {
      this.message = '';
      this.viaCEPService
        .getViaCEPService(this.areaBuscarPokemon)
        .subscribe((value) => {
          this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))[
            'logradouro'
          ];
          this.areaBusca.bairro =
            ', ' + JSON.parse(JSON.stringify(value))['bairro'];
          this.areaBusca.localidade =
            ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
          this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))['uf'];
        });
      this.pokeAPIService.getPokeAPIService('tab1').subscribe((value) => {
        this.capturedPokemon.name = JSON.parse(JSON.stringify(value))['name'];
        this.capturedPokemon.weight = JSON.parse(JSON.stringify(value))[
          'weight'
        ];
        this.capturedPokemon.height = JSON.parse(JSON.stringify(value))[
          'height'
        ];
        this.capturedPokemon.abilities = JSON.parse(JSON.stringify(value))[
          'abilities'
        ].length;
        this.capturedPokemon.image = JSON.parse(JSON.stringify(value))[
          'sprites'
        ]['front_default'];
      });
      this.battleService.setCapturedPokemon(this.capturedPokemon);
      this.changeDetectorRef.detectChanges();
    } else {
      this.message = 'Para capturar um Pokémon, defina uma localização';
    }
  }
}
