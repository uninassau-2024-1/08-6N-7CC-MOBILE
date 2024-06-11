import { Component } from '@angular/core';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  pokedex: any[] = [];

  constructor(private pokedexService: PokedexService) {}

  ionViewWillEnter() {
    this.loadPokedex();
  }

  loadPokedex() {
    this.pokedex = this.pokedexService.getPokedex();
  }
}