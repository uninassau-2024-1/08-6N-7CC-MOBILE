import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  pokemons: any[] = [];

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.pokemons = this.sharedDataService.getPokemons();
  }

  ionViewWillEnter() {
    this.pokemons = this.sharedDataService.getPokemons();
  }
}
