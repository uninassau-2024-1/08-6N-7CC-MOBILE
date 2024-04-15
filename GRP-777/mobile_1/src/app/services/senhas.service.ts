import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public inputNovaSenha: string = '';
  public senhasArray: { [key: string]: string[] } = { SG: [], SP: [], SE: [] };
  public ultimasSenhasChamadas: string[] = [];

  constructor() { }

  somaGeral() { this.senhasGeral++; this.senhasTotal++; }
  somaPrior() { this.senhasPrior++; this.senhasTotal++; }
  somaExame() { this.senhasExame++; this.senhasTotal++; }

  novaSenha(tipoSenha: string = '') {
    const now = new Date();
    let tipo: string = '';
    if (tipoSenha == 'SG') {
      this.somaGeral();
      tipo = 'SG';
    } else if (tipoSenha == 'SP') {
      this.somaPrior();
      tipo = 'SP';
    } else if (tipoSenha == 'SE') {
      this.somaExame();
      tipo = 'SE';
    }
    const senha = this.emitirSenha(tipo);
    console.log('Nova senha emitida:', senha);
    this.senhasArray[tipo].push(senha);
    this.atualizarUltimasSenhasChamadas();
  }

  calcularTempoRetencao(tipoSenha: string): number {
    
    if (tipoSenha == 'SP') {
      return Math.floor(Math.random() * 11) + 10; 
    } else if (tipoSenha == 'SG') {
      return Math.floor(Math.random() * 7) + 3; 
    } else if (tipoSenha == 'SE') {
      const chanceRapido = Math.random();
      if (chanceRapido <= 0.95) {
        return 1; 
      } else {
        return Math.floor(Math.random() * 5) + 1; 
      }
    }
    return 0;
  }

  private emitirSenha(tipo: string): string {
    const now = new Date();
    const numeroSenha =
      `${now.getFullYear().toString().substring(2, 4)}` +
      `${(now.getMonth() + 1).toString().padStart(2, '0')}` +
      `${now.getDate().toString().padStart(2, '0')}` +
      `-${tipo}` +
      `${(this.senhasArray[tipo].length + 1).toString().padStart(2, '0')}`;
    return numeroSenha;
  }

  private atualizarUltimasSenhasChamadas(): void {
    const todasSenhas: string[] = [];
    Object.values(this.senhasArray).forEach((senhas: string[]) => {
      todasSenhas.push(...senhas);
    });
  
    todasSenhas.sort((a: string, b: string) => {
      const aData: string = a.split('-')[0];
      const bData: string = b.split('-')[0];
      const aNum: number = parseInt(a.split('-')[1].substring(2));
      const bNum: number = parseInt(b.split('-')[1].substring(2));
      return aData === bData ? aNum - bNum : aData.localeCompare(bData);
    });
  
    this.ultimasSenhasChamadas = todasSenhas.slice(-5);
  }
  
}
