import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {

  public senhasGeral: number = 0;

  public senhasPrior: number = 0;

  public senhasExame: number = 0;

  public senhasTotal: number = 0;

  public inputNovaSenha: any;

  public removendoSP: boolean = true;

  public senhaEmitida: string = '';

  public senhaRemovida: string = '';

  public listaSenhas = {
    'SP': [],
    'SE': [],
    'SG': [],
    'ST': []
  };

  somaGeral() { this.senhasGeral++; this.senhasTotal++; }

  somaPrior() { this.senhasPrior++; this.senhasTotal++; }

  somaExame() { this.senhasExame++; this.senhasTotal++; }


  novaSenha(tipoSenha: string = '') {

    if (tipoSenha == 'SG') {

      this.somaGeral();

      let senha = this.inputNovaSenha =

        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.listaSenhas['SG'].length + 1).toString().padStart(2, '0');

      this.listaSenhas.SG.push(senha);
      this.listaSenhas.ST.push(senha)

    } else if (tipoSenha == 'SP') {

      this.somaPrior();

      let senha = this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.listaSenhas['SP'].length + 1).toString().padStart(2, '0');

      this.listaSenhas.SP.push(senha);
      this.listaSenhas.ST.push(senha)

    } else if (tipoSenha == 'SE') {


      this.somaExame();

      let senha = this.inputNovaSenha =

        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.listaSenhas['SE'].length + 1).toString().padStart(2, '0');

        this.listaSenhas.SE.push(senha);
        this.listaSenhas.ST.push(senha)
      return this.listaSenhas;

    }
  }

  public iniciarChamadaSenha(): void {
    const tempoEspera = this.senhaRemovida.includes('SP') ? 10000 : this.senhaRemovida.includes('SG') ? 7000 : 5000;
    setTimeout(() => this.chamarSenha(), tempoEspera);
  }

  public chamarSenha() {
    let listaSenhas = this.listaSenhas;

    if (listaSenhas.ST.length > 0) {
      if (this.removendoSP && listaSenhas.ST.some((senha: string) => senha.includes('SP'))) {
        let indexSP: number = listaSenhas.ST.findIndex((senha: string) => senha.includes('SP'));
        if (indexSP !== -1) {
          this.senhaRemovida = listaSenhas.ST[indexSP];
          listaSenhas.ST.splice(indexSP, 1);
        }
      }
      else if (!this.removendoSP && (listaSenhas.ST.some((senha: string) => senha.includes('SE')) || listaSenhas.ST.some((senha: string) => senha.includes('SG')))) {
        let senhasDisponiveis = listaSenhas.ST.filter((senha: string) => senha.includes('SE') || senha.includes('SG'));
        let index = Math.floor(Math.random() * senhasDisponiveis.length);
        if (index !== -1) {
          this.senhaRemovida = senhasDisponiveis[index];
          listaSenhas.ST.splice(listaSenhas.ST.indexOf(senhasDisponiveis[index]), 1);
        }
      }

      this.removendoSP = !this.removendoSP;
      this.iniciarChamadaSenha();
    } else {
      this.presentAlert()
    }

    return this.senhaRemovida;

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'lista vazia',
      message: 'Todas as senhas foram chamadas',
      buttons: ['Fechar'],
    });

    await alert.present();

  }

  constructor(public alertController: AlertController) {
  }
}