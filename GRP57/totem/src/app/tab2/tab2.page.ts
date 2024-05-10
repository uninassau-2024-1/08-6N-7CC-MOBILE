import { Component } from '@angular/core';
import { AtendimentoService } from '../services/atendimento.service';
import { SenhasService } from '../services/senhas.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public inputAtendimento: string = '';
  public novaSenha: any;

  public isButtonDisabled: boolean;

  constructor(public alertController: AlertController, public SenhasService: SenhasService) { }

  chamarProximaSenha() {

    if (this.SenhasService.listaSenhas.ST.length > 0) {
      this.SenhasService.listaSenhas.ST.sort((a: string, b: string) => {
        const priorityMap: { [key: string]: number } = { 'SP': 1, 'SE': 2, 'SG': 3 };
        return priorityMap[a.substring(9, 11)] - priorityMap[b.substring(9, 11)];
      });


      const proximaSenha = this.SenhasService.listaSenhas.ST[0];
      this.SenhasService.listaSenhas.ST.shift();
      this.SenhasService.senhaEmitida = proximaSenha;
      return proximaSenha;
    } else {
      console.log('Não há mais senhas na fila.');
      return null;
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Iniciando chamada de senhas',
      message: 'Senhas serão chamadas, espere a fila terminar para iniciar outra chamada',
      buttons: ['Fechar'],
    });

    await alert.present();

  }

}

