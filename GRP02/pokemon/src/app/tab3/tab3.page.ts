import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  pokedex: any[] = [];

  constructor(private pokedexService: PokedexService) {}

  ngOnInit() {
    this.pokedex = this.pokedexService.getPokedex();
  }
}
