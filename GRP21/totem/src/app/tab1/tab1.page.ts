import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public listaSenhas: any;

  proximaSenha: string = '';



  constructor(public senhasService: SenhasService, public alertController: AlertController) { }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Senha emitida',
      message: 'Sua senha foi emitida e será chamada na tela "chamada"',
      buttons: ['Fechar'],
    });

    await alert.present();

  }
}
