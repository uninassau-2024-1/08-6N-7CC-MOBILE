import { Injectable } from '@angular/core';
import { SenhasArray } from './ISenhasinterface';
@Injectable({
  providedIn: 'root'
})
export class SenhasService {



  public senhasArray: SenhasArray = {
    SG: [],
    SP: [],
    SE: []
  }

  constructor() { }

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public inputNovaSenha: string = '';

  public senhaPriorAtend: number = 0;
  public senhaExmAtend: number = 0;
  public senhaGeralAtend: number = 0;
  public qtdPrior: boolean = false;

  public senhasAtend: string[] = [];

  public ultimasSenhas:string[]=[]
  public ultimaSenhaChamada:string = ''
  somaGeral() {
    this.senhaGeralAtend++;
    this.senhasGeral++;
    this.senhasTotal++;
  }

  somaPrior() {
    this.senhaPriorAtend++;
    this.senhasPrior++;
    this.senhasTotal++;
  }

  somaExame() {
    this.senhaExmAtend++;
    this.senhasExame++;
    this.senhasTotal++;
  }

  novaSenha(tipoSenha: string) {
    if (tipoSenha == 'SG') {
      this.somaGeral();

      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SG'].length + 1).toString().padStart(2, '0');
      console.log(this.inputNovaSenha);
      this.senhasArray.SG.push(this.inputNovaSenha);


    } else if (tipoSenha == 'SP') {
      this.somaPrior();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SP'].length + 1).toString().padStart(2, '0');
        console.log(this.inputNovaSenha);
      this.senhasArray.SP.push(this.inputNovaSenha);
    } else {
      this.somaExame();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SE'].length + 1).toString().padStart(2, '0');
        console.log(this.inputNovaSenha);
      this.senhasArray.SE.push(this.inputNovaSenha);
    }
    console.log(this.senhasArray);
  }

  atendeSenha(){

    let v:number = 0;

    if(this.senhasArray.SE.length == 0 && this.senhasArray.SP.length == 0 && this.senhasArray.SG.length == 0) {
      console.log('vazio');


    } else if((this.senhasArray.SP.length>=1 && this.qtdPrior ==false )||(this.senhasArray.SE.length == 0 && this.senhasArray.SP.length >= 1 && this.senhasArray.SG.length == 0) ||(this.qtdPrior==true && this.senhasArray.SP.length>=1 && this.senhasArray.SE.length ==0)||(this.qtdPrior ==false && this.senhasArray.SE.length >= 1 && this.senhasArray.SP.length > 0 && this.senhasArray.SG.length == 0)){

      console.log('atende prior');
      this.qtdPrior = true;
      this.senhasAtend.push(this.senhasArray.SP[0]);
      this.senhasArray.SP.splice(0, 1);
      this.senhaPriorAtend--;
      v = this.senhasAtend.length;

    } else if((this.qtdPrior ==true && this.senhasArray.SE.length > 0)  ||(this.qtdPrior ==false && this.senhasArray.SE.length >= 1 && this.senhasArray.SP.length == 0 && this.senhasArray.SG.length == 0)||(this.qtdPrior ==true && this.senhasArray.SE.length > 0  && this.senhasArray.SP.length > 0 && this.senhasArray.SG.length == 0) ){
      //
      this.senhasAtend.push(this.senhasArray.SE[0]);
      this.senhasArray.SE.splice(0, 1);
      this.senhaExmAtend--;
      this.qtdPrior = false;
      console.log("atend exm");

    } else if((this.senhasArray.SE.length == 0 && this.senhasArray.SP.length == 0 && this.senhasArray.SG.length > 0) ||(this.qtdPrior==true && this.senhasArray.SP.length == 0 && this.senhasArray.SG.length > 0 && this.senhasArray.SE.length == 0)) {
      this.senhasAtend.push(this.senhasArray.SG[0]);
      this.senhaGeralAtend--;
      this.senhasArray.SG.splice(0, 1);
      console.log('atend geral');
    }

     this.ultimasSenhas = this.senhasAtend.length > 5 ? this.senhasAtend.slice(-5) : this.senhasAtend;
      this.ultimaSenhaChamada = this.senhasAtend.length == 0 ? "Realize um atendimento!":this.senhasAtend[this.senhasAtend.length - 1];
    console.log(this.senhasArray);
    console.log(this.senhasAtend);
    console.log(this.ultimaSenhaChamada);



  }


}
