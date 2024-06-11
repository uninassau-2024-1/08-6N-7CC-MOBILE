import { Component, ChangeDetectorRef } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { BattleService } from '../services/battle-service.service';
import { CapturedPokemonService } from '../services/captured-pokemon.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  capturedPokemon: any = {
    name: '',
    weight: '',
    height: '',
    abilities: '',
    image: '',
    battleResult: '',
  };

  nameColor: string = '';

  finalResult: string = '';

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private changeDetectorRef: ChangeDetectorRef,
    private battleService: BattleService,
    private capturedPokemonService: CapturedPokemonService
  ) {}

  ionViewDidEnter() {
    this.buscarPokemon();
  }

  buscarPokemon() {
    this.pokeAPIService.getPokeAPIService('tab2').subscribe((value) => {
      this.capturedPokemon.name = JSON.parse(JSON.stringify(value))['name'];
      this.capturedPokemon.weight = JSON.parse(JSON.stringify(value))['weight'];
      this.capturedPokemon.height = JSON.parse(JSON.stringify(value))['height'];
      this.capturedPokemon.abilities = JSON.parse(JSON.stringify(value))[
        'abilities'
      ].length;
      this.capturedPokemon.image = JSON.parse(JSON.stringify(value))['sprites'][
        'front_default'
      ];

      this.battleService.setOpponent(this.capturedPokemon);

      this.battle();

      this.changeDetectorRef.detectChanges();
    });
  }

  battle() {
    const myPokemon = this.battleService.getCapturedPokemon();
    if (myPokemon) {
      const opponentPokemon = this.battleService.getOpponent();
      const myPokemonAbilities = myPokemon.abilities;
      const opponentPokemonAbilities = opponentPokemon.abilities;
      const myPokemonName = myPokemon.name;

      if (myPokemonAbilities > opponentPokemonAbilities) {
        this.finalResult = myPokemonName + ' ganhou a batalha!';
        this.capturedPokemon.battleResult = 'Ganhou';
        this.nameColor = 'vermelho';
      } else if (myPokemonAbilities < opponentPokemonAbilities) {
        this.finalResult = myPokemonName + ' perdeu a batalha!';
        this.capturedPokemon.battleResult = 'Perdeu';
        this.nameColor = 'verde';
      } else {
        this.finalResult = myPokemonName + ' empatou!';
        this.capturedPokemon.battleResult = 'Empate';
        this.nameColor = 'amarelo';
      }

      this.battleService.setResult(this.capturedPokemon.battleResult);

      this.capturedPokemonService.setPokemonResult({
        battleResult: this.capturedPokemon.battleResult,
        capturedPokemon: myPokemon,
      });

      this.changeDetectorRef.detectChanges();
    }
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
