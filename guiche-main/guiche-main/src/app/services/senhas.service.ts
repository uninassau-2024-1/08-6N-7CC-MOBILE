import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SenhasService {
  // variables
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public atendidaGeral: number = 0;
  public atendidaPrior: number = 0;
  public atendidaExame: number = 0;
  public inputNovaSenha: string = '';
  public senhasArray: any = { SG: [], SP: [], SE: [] };
  public senhasFaltandoChamar: any[] = [];
  public senhasChamadas: any[] = [];
  public relatorioSenhasAtendidas: any[] = [];

  // method to add new password to password array
   senhaRetirada(tipoSenha: string = '') {
    let senhaRetiradaObjeto = {
      icon: '',
      color: '',
      senha: '',
      tipo_senha: '',
      tm_geracao: new Date().toISOString(),
    };

    if (tipoSenha == 'SG') {
      this.somaGeral();
      senhaRetiradaObjeto.senha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SG'].length + 1).toString().padStart(2, '0');
      senhaRetiradaObjeto.icon = 'person';
      senhaRetiradaObjeto.color = 'dark';
      senhaRetiradaObjeto.tipo_senha = 'SG';
      this.senhasArray.SG.push({ ...senhaRetiradaObjeto });
      this.alertaObrigado();
    } else if (tipoSenha == 'SP') {
      this.somaPrior();
      senhaRetiradaObjeto.senha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SP'].length + 1).toString().padStart(2, '0');
      senhaRetiradaObjeto.icon = 'warning';
      senhaRetiradaObjeto.color = 'danger';
      senhaRetiradaObjeto.tipo_senha = 'SP';
      this.senhasArray.SP.push({ ...senhaRetiradaObjeto });
      this.alertaObrigado();
    } else if (tipoSenha == 'SE') {
      this.somaExame();
      senhaRetiradaObjeto.senha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SE'].length + 1).toString().padStart(2, '0');
      senhaRetiradaObjeto.icon = 'document';
      senhaRetiradaObjeto.color = 'dark';
      senhaRetiradaObjeto.tipo_senha = 'SE';
      this.senhasArray.SE.push({ ...senhaRetiradaObjeto });
      this.alertaObrigado();
    }
    this.senhasFaltandoChamar.push({ ...senhaRetiradaObjeto });
  }

  //method to call password
  async chamarSenha() {
    if (this.senhasFaltandoChamar.length === 0) {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Ainda não há senhas no painel de chamada!',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      let senhaPrioritariaEncontrada = false;
      if (this.senhasChamadas.length <= 4 ) {
        for (let senha of this.senhasFaltandoChamar) {
          if (senha.icon === 'warning') {
            this.senhasChamadas.push(senha);
            this.removerSenhaDoArray(senha);
            senhaPrioritariaEncontrada = true;
            break;
          }
        }
        if (
          !senhaPrioritariaEncontrada &&
          this.senhasFaltandoChamar.length > 0
        ) {
          let próximaSenha = this.senhasFaltandoChamar.shift();
          this.senhasChamadas.push(próximaSenha);
        }
        this.displaySenhasAtendidas();
      } else {
        const alert = await this.alertController.create({
          header: 'Aviso',
          message:
            'O painel de chamadas está cheio. Por favor, limpe-o.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

  //method to remove password from array
  removerSenhaDoArray(senha: any) {
    const index = this.senhasFaltandoChamar.findIndex((s) => s === senha);
    if (index !== -1) {
      this.senhasFaltandoChamar.splice(index, 1);
    }
  }

  //método que chama um alerta ao retirar uma senha
  async alertaObrigado() {
    const alert = await this.alertController.create({
      header: 'Obrigado(a)!',
      message: 'Agora é só aguardar.',
      buttons: ['OK'],
    });
    await alert.present();
  }
  //methods to count the number of times the password has been called
  somaGeral() {
    this.senhasGeral++;
    this.senhasTotal++;
  }
  somaPrior() {
    this.senhasPrior++;
    this.senhasTotal++;
  }
  somaExame() {
    this.senhasExame++;
    this.senhasTotal++;
  }

  //method to count the number of times the password was answered
  displaySenhasAtendidas() {
    this.atendidaGeral = 0;
    this.atendidaPrior = 0;
    this.atendidaExame = 0;

    for (let senha of this.senhasChamadas) {
      if (senha.tipo_senha == 'SG') {
        this.atendidaGeral++;
      } else if (senha.tipo_senha == 'SP') {
        this.atendidaPrior++;
      } else {
        this.atendidaExame++;
      }
    }
    this.relatorioSenhasAtendidas.push({ ...this.senhasChamadas });
  }
  //method for cleaning the window panel
  async limparPainel() {
    if (this.senhasChamadas.length >= 4) {
      this.senhasChamadas = [];
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Painel limpo com sucesso ;)',
        buttons: ['OK'],
      });
      await alert.present();
    } else if (this.senhasChamadas.length === 0) {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Ainda não há senhas no painel do guichê.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Ainda há espaço no painel.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  constructor(private alertController: AlertController) {}
}
