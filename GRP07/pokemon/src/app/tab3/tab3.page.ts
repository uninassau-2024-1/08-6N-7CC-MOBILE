import { Component } from '@angular/core';
import { PokedexService } from '../services/Pokedex/pokedex.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public pokedexService: PokedexService,
    private alertController: AlertController,
  ) {}

  ionViewDidEnter() {
    this.checkForPokemons();
  }

  checkForPokemons(){
    if (this.pokedexService.dexPokemons.length === 0) {
      this.presentAlertNoPokemon();
    }
  }

  async presentAlertNoPokemon() {
    const alert = await this.alertController.create({
      header: 'Nenhum Pokémon capturado!',
      message: 'Por favor, capture um Pokémon antes de verificar a Pokédex.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
