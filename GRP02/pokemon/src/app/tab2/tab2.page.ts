import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  pokemon: any = null;

  constructor(private pokeAPIService: PokeAPIService,
    public photoService:PhotoService) {}
  
  
  addPhotoToGallery(){
    this.photoService.addNewToGallery();
  }


  ngOnInit() {
    this.loadRandomPokemon();
  }

  loadRandomPokemon() {
    this.pokeAPIService.getPokemonById().subscribe(pokemon => {
      this.pokemon = pokemon;
    });
  }
}
