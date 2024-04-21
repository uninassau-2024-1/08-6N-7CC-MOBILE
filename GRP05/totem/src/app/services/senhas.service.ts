import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SenhasService {
  public senhasGeral: number = 0;
  public senhasPrioridade: number = 0;
  public senhasExames: number = 0;
  public senhasTotais: number = 0;
  public senhasArray: any = [];
  public inputNovaSenha: string = '';
  public TempoIntermediarioTudo: number = 0;
  public TempoIntermediarioPrioridade: number = 0;
  public TempoIntermediarioExame: number = 0;
  public senhasChamadas: string[] = [];

  constructor() {}

  private expedienteIniciado: boolean = false;
  private expedienteEncerrado: boolean = false;

  iniciarExpediente() {
    this.expedienteIniciado = true;
    this.expedienteEncerrado = false;
  }

  encerrarExpediente() {
    this.expedienteEncerrado = true;
    this.limparSenhasRemanescentes();
  }

  expedienteEmAndamento(): boolean {
    return this.expedienteIniciado && !this.expedienteEncerrado;
  }

  private limparSenhasRemanescentes() {
    if (!this.expedienteEncerrado) {
      return;
    }

    this.senhasArray = [];
    this.senhasGeral = 0;
    this.senhasPrioridade  = 0;
    this.senhasTotais  = 0;
    this.senhasExames = 0;
    this.senhasChamadas = [];
  }

  isHorarioExpediente(): boolean {
    const agora = new Date();
    const horaAtual = agora.getHours();
    return horaAtual >= 7 && horaAtual < 17;
  }

  //somas
  somaGeral() {
    this.senhasGeral++;
    this.senhasTotais++;
  }
  somaPrior() {
    this.senhasPrioridade++;
    this.senhasTotais++;
  }
  somaExame() {
    this.senhasExames++;
    this.senhasTotais++;
  }

  // Calcula tempo de demora
  calcularDemora(tipoSenha: string): number {
    if (tipoSenha === 'SP') {
      const min = 10;
      const max = 20;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else if (tipoSenha === 'SE') {
      const percentage = Math.random();
      if (percentage <= 0.05) {
        return 5; 
      } else {
        return 1; 
      }
    } else {
      const min = 2;
      const max = 8;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

  // Calcula tempo médio de atendimento
  calcularTempoMedio() {
    if (this.senhasGeral > 0) {
      this.TempoIntermediarioTudo = Math.round(
        this.senhasArray.SG.reduce((sum: number, senha: string) => {
          return sum + this.calcularDemora('SG');
        }, 0) / this.senhasGeral
      );
    }

    if (this.senhasPrioridade > 0) {
      this.TempoIntermediarioPrioridade = Math.round(
        this.senhasArray.SP.reduce((sum: number, senha: string) => {
          return sum + this.calcularDemora('SP');
        }, 0) / this.senhasPrioridade
      );
    }

    if (this.senhasExames > 0) {
      this.TempoIntermediarioExame = Math.round(
        this.senhasArray.SE.reduce((sum: number, senha: string) => {
          return sum + this.calcularDemora('SE');
        }, 0) / this.senhasExames
      );
    }
  }

  // imprimi nova senha formatada
  novaSenha(tipoSenha: string = '') {
    var year = new Date().getFullYear().toString().substring(2, 4);
    var month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    var day = new Date().getDate().toString().padStart(2, '0');
    let contador: number;
    let senha: string = '';

    // senha geral
    if (tipoSenha == 'SG') {
      this.somaGeral();
      contador = this.senhasGeral;
      senha = `${year}${month}${day}-${tipoSenha}${contador
        .toString()
        .padStart(2, '0')}`;
      if (!this.senhasArray['SG']) {
        this.senhasArray['SG'] = [];
      }
      this.senhasArray['SG'].push(senha);

      //senha prioritária
    } else if (tipoSenha == 'SP') {
      this.somaPrior();
      contador = this.senhasPrioridade;
      senha = `${year}${month}${day}-${tipoSenha}${contador
        .toString()
        .padStart(2, '0')}`;
      if (!this.senhasArray['SP']) {
        this.senhasArray['SP'] = [];
      }
      this.senhasArray['SP'].push(senha);

      // senha exama
    } else if (tipoSenha == 'SE') {
      this.somaExame();
      contador = this.senhasExames;
      senha = `${year}${month}${day}-${tipoSenha}${contador
        .toString()
        .padStart(2, '0')}`;
      if (!this.senhasArray['SE']) {
        this.senhasArray['SE'] = [];
      }
      this.senhasArray['SE'].push(senha);
    }

    this.inputNovaSenha = senha;
    console.log(this.senhasArray);
    this.calcularTempoMedio();

     // Verificar se o histórico ultrapassa 5 senhas e remover a mais antiga, se necessário
     if (this.senhasChamadas.length > 5) {
      this.senhasChamadas.shift(); // Remove a primeira senha (a mais antiga)
    }
    if (!this.expedienteEmAndamento() || !this.isHorarioExpediente()) {
      return; // Não gera novas senhas se o expediente não estiver em andamento ou fora do horário
    }
  }

}
