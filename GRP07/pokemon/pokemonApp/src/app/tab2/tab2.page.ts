import { Component } from '@angular/core';
import { PhotoService } from '../services/Photo/photo.service';
import { PokeAPIService } from '../services/PokeAPI/poke-api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  resultado: string = '';
  cor: string = '';

  constructor(
    public photoService: PhotoService,
    public pokeAPIService: PokeAPIService,
    public navController: NavController,
  ) {}


  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  ionViewDidEnter() {
    this.buscarPokemon();
  }

  pokemon: any = {
    nome: '',
    img: '',
    habilidade: '',
    altura: '',
    peso: ''
  }

  buscarPokemon(){
    this.pokeAPIService.getPokeAPIService().subscribe((value) => {
      this.pokemon.nome = JSON.parse(JSON.stringify(value)) ['name'];
      this.pokemon.img = JSON.parse(JSON.stringify(value)) ['id'];
      this.pokemon.habilidade = (JSON.parse(JSON.stringify(value)) ['abilities']).length -1;
      this.pokemon.altura = JSON.parse(JSON.stringify(value)) ['height'];
      this.pokemon.peso = JSON.parse(JSON.stringify(value)) ['weight'];
    });

    this.pokeAPIService.setTab2Habilidade(parseInt(this.pokemon.habilidade));
    this.pokeAPIService.batalhar();
    this.resultado = this.pokeAPIService.resultado;
    this.cor = this.pokeAPIService.cor

  }

}