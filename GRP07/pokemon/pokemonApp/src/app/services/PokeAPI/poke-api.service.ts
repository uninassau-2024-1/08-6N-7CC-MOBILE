import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PokedexService } from '../Pokedex/pokedex.service';


@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  private tab1Habilidade: number = 0;
  private tab2Habilidade: number = 0;
  resultado: string = '';
  cor: string = '';

  constructor(
    private httpClient: HttpClient,
    private alertController: AlertController,
    private pokedexService: PokedexService
  ) { }

  getPokeAPIService(id: number = (Math.floor(Math.random()* 100)) + 1){
    this.pokedexService.guardarPokemon(id)
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }

  getPokeAPIServiceTab2(id: number = (Math.floor(Math.random()* 100)) + 1){
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }


  setTab1Habilidade(hab: number){
    this.tab1Habilidade = hab;
  }

  setTab2Habilidade(hab: number){
    this.tab2Habilidade = hab;
  }

  batalhar(){
    if (this.tab1Habilidade != 0) {
      if (this.tab2Habilidade > this.tab1Habilidade) {
        this.resultado = 'Ganhou'
        this.cor = 'danger'
        this.pokedexService.somaVitoria()
      } else if (this.tab2Habilidade < this.tab1Habilidade) {
        this.resultado = 'Perdeu'
        this.cor = 'success'
        this.pokedexService.somaDerrota()
      } else {
        this.resultado = 'Empate'
        this.cor = 'warning'
        this.pokedexService.somaEmpate()
      }
    } else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Nenhum Pokemon capturado!',
      message: 'Por favor realize uma busca antes da batalha',
      buttons: ['OK'],
    });

    await alert.present();
  }
}