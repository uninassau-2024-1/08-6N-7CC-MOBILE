import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {

  public tipoSenha: string[] = []
  public tipoSenhaAtual: string = '';

  public senhaGeral: number = 0;
  public senhaPrior: number = 0;
  public senhaExame: number = 0;
  public senhasTotal: number = 0;

  public inputNovaSenha: string = '';
  public proximaSenha: string = '';

  public atendimentoOk: boolean = false;
  public senhaChamadaOk: boolean = false;
  public senhaGeralOk: boolean = false;
  public senhaPriorOk: boolean = false;
  public senhaExameOk: boolean = false;

  public mediaSenhaGeral: number =0;
  public mediaSenhaPrior: number =0;
  public mediaSenhaExame: number =0;

  public numSenhaGeral: number =0;
  public numSenhaPrior: number =0;
  public numSenhaExame: number =0;

  public senhasChamadas: number = 0;
  public senhasGeralChamadas: number = 0;
  public senhasPriorChamadas: number = 0;
  public senhasExameChamadas: number = 0;

  public fimAtendimento: number = 0;
  public inicioAtendimento: number = 0;
  public diferencaTempo: number = 0;

  public tempoAtendimentoSG: number[] = [];
  public tempoAtendimentoSP: number[] = [];
  public tempoAtendimentoSE: number[] = [];

  public senhasArray: { [key: string]: string[] } = {'SG': [],'SP': [],'SE': [] };
  public listaSenhas: string[] = [];

  somaGeral() { this.senhaGeral++; this.senhasTotal++; }
  somaPrior() { this.senhaPrior++; this.senhasTotal++; }
  somaExame() { this.senhaExame++; this.senhasTotal++; }

  novaSenha(tipoSenhas: string = '') {

    if (tipoSenhas == 'SG') {
      this.somaGeral();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenhas +
        (this.numSenhaGeral +1).toString().padStart(2, '0');
      this.senhasArray['SG'].unshift(this.inputNovaSenha);
      this.numSenhaGeral ++ ;
      this.tipoSenhaAtual = tipoSenhas
    } else if (tipoSenhas == 'SP') {
      this.somaPrior();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenhas +
        (this.numSenhaPrior +1).toString().padStart(2, '0');
      this.senhasArray['SP'].unshift(this.inputNovaSenha);
      this.numSenhaPrior ++ ;
      this.tipoSenhaAtual = tipoSenhas
    } else if (tipoSenhas == 'SE') {
      this.somaExame();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenhas +
        (this.numSenhaExame + 1).toString().padStart(2, '0');
      this.senhasArray['SE'].unshift(this.inputNovaSenha);
      this.numSenhaExame ++ ;
      
      
    }
    console.log(this.senhasArray);
  }

  chamarProximaSenha(): string | null {
    const inicio = new Date().getTime();
    if (this.senhasArray['SP'].length > 0 && this.senhaPriorOk == false) {
      this.proximaSenha =
        this.senhasArray['SP'][this.senhasArray['SP'].length - 1];
      this.listaSenhas.unshift(this.proximaSenha);
      this.senhasArray['SP'].pop();
      this.senhaPriorOk = true;
      this.senhaGeralOk = false;
      this.senhaExameOk = false;
      this.tipoSenha.unshift('SP')
      this.tipoSenhaAtual = 'SP';
      this.senhasPriorChamadas++; 
      this.senhasChamadas++;// Incrementa a contagem de senhas prioritárias chamadas
    } else if (this.senhasArray['SE'].length > 0 && this.senhaExameOk == false) {
      this.proximaSenha =
        this.senhasArray['SE'][this.senhasArray['SE'].length - 1];
      this.listaSenhas.unshift(this.proximaSenha);
      this.senhasArray['SE'].pop();
      this.senhaPriorOk = false;
      this.senhaGeralOk = false;
      this.senhaExameOk = true;
      this.tipoSenha.unshift('SE')
      this.tipoSenhaAtual = 'SE';
      this.senhasExameChamadas++; 
      this.senhasChamadas++;// Incrementa a contagem de senhas de exame chamadas
    } else if (this.senhasArray['SG'].length > 0 && this.senhaGeralOk == false) {
      this.proximaSenha =
        this.senhasArray['SG'][this.senhasArray['SG'].length - 1];
      this.listaSenhas.unshift(this.proximaSenha);
      this.senhasArray['SG'].pop();
      this.senhaPriorOk = false;
      this.senhaGeralOk = true;
      this.senhaExameOk = false;
      this.tipoSenha.unshift('SG')
      this.tipoSenhaAtual = 'SG';
      this.senhasGeralChamadas++; 
      this.senhasChamadas++;// Incrementa a contagem de senhas gerais chamadas
    } else {
      this.senhaPriorOk = false;
      this.senhaGeralOk = false;
      this.senhaExameOk = false;
      return null;
    }
    this.senhaChamadaOk = true;
    return this.proximaSenha;
  }

  iniciarAtendimento(){

    var tempoInicio = Math.floor(Date.now() / 1000);
    this.inicioAtendimento = tempoInicio;
    this.atendimentoOk = true;
    this.tipoSenhaAtual = this.tipoSenha[this.tipoSenha.length - 1]
  }

  encerrarAtendimento(){
    var tempoFinalizado = Math.floor(Date.now() / 1000);
    this.fimAtendimento = tempoFinalizado;
    var diferencaTempo = this.fimAtendimento - this.inicioAtendimento;
    if (this.tipoSenha.length > 0) { // Verifica se há elementos na lista
        if (this.tipoSenha[this.tipoSenha.length - 1] == 'SG') {
            this.tempoAtendimentoSG.unshift(diferencaTempo);
        } else if (this.tipoSenha[this.tipoSenha.length - 1] == 'SP') {
            this.tempoAtendimentoSP.unshift(diferencaTempo);
        } else if (this.tipoSenha[this.tipoSenha.length - 1] == 'SE') {
            this.tempoAtendimentoSE.unshift(diferencaTempo);
        }
        this.tipoSenha.shift(); // Remove o primeiro elemento da lista
    }

    this.atendimentoOk = false;
    console.log('SG' + this.tempoAtendimentoSG);
    console.log('SP' +this.tempoAtendimentoSP);
    console.log('SE' +this.tempoAtendimentoSE);
    console.log(this.tipoSenha);

    var somaSG = 0;
    var somaSP = 0;
    var somaSE = 0;

    for (var i = 0; i < this.tempoAtendimentoSG.length; i++) {
      somaSG += this.tempoAtendimentoSG[i];
    }
    this.mediaSenhaGeral = this.tempoAtendimentoSG.length > 0 ? somaSG / this.tempoAtendimentoSG.length : 0;
    this.mediaSenhaGeral = Math.round(this.mediaSenhaGeral);

    for (var i = 0; i < this.tempoAtendimentoSP.length; i++) {
      somaSP += this.tempoAtendimentoSP[i];
    }
    this.mediaSenhaPrior = this.tempoAtendimentoSP.length > 0 ? somaSP / this.tempoAtendimentoSP.length : 0;
    this.mediaSenhaPrior =Math.round(this.mediaSenhaPrior);

    for (var i = 0; i < this.tempoAtendimentoSE.length; i++) {
      somaSE += this.tempoAtendimentoSE[i];
    }
    this.mediaSenhaExame = this.tempoAtendimentoSE.length > 0 ? somaSE / this.tempoAtendimentoSE.length : 0;
    this.mediaSenhaExame =Math.round(this.mediaSenhaExame);
    this.senhaChamadaOk = false;
  }

  constructor() { }
}
