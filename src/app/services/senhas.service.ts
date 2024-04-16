import { Injectable } from '@angular/core';
import { AtendimentoService } from './atendimento.service';

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

  public senhaRemovida : string = '';



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

      console.log(this.listaSenhas.SG)
      console.log(this.inputNovaSenha)

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

      console.log(this.listaSenhas.SP)
      console.log(this.inputNovaSenha)

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

      console.log(this.listaSenhas.SE)
      console.log(this.inputNovaSenha)


      return this.listaSenhas;

    }
  }

  public iniciarChamadaSenha(): void {
    // Chama a próxima senha após o tempo de espera
    const tempoEspera = this.senhaRemovida.includes('SP') ? 10000 : this.senhaRemovida.includes('SG') ? 7000 : 5000;
    setTimeout(() => this.chamarSenha(), tempoEspera);
}

  public chamarSenha() {
    let listaSenhas = this.listaSenhas;


    // Verifica se ainda há senhas na lista
    if (listaSenhas.ST.length > 0) {
        // Se estamos removendo uma senha SP
        if (this.removendoSP && listaSenhas.ST.some((senha: string) => senha.includes('SP'))) {
            let indexSP: number = listaSenhas.ST.findIndex((senha: string) => senha.includes('SP'));
            if (indexSP !== -1) {
                this.senhaRemovida = listaSenhas.ST[indexSP]; // Armazenando a última senha removida
                listaSenhas.ST.splice(indexSP, 1);
                console.log("Senha SP removida: " + this.senhaRemovida);
            }
        } 
        // Se estamos removendo uma senha SE ou SG
        else if (!this.removendoSP && (listaSenhas.ST.some((senha: string) => senha.includes('SE')) || listaSenhas.ST.some((senha: string) => senha.includes('SG')))) {
            // Filtra as senhas disponíveis para remoção (SE ou SG)
            let senhasDisponiveis = listaSenhas.ST.filter((senha: string) => senha.includes('SE') || senha.includes('SG'));
            // Seleciona aleatoriamente uma das senhas disponíveis
            let index = Math.floor(Math.random() * senhasDisponiveis.length);
            if (index !== -1) {
                this.senhaRemovida = senhasDisponiveis[index]; // Armazenando a última senha removida
                listaSenhas.ST.splice(listaSenhas.ST.indexOf(senhasDisponiveis[index]), 1);
                console.log("Senha SE ou SG removida: " + this.senhaRemovida);
            }
        }


        this.removendoSP = !this.removendoSP;
        this.iniciarChamadaSenha();
    } else {
        console.log("Lista de senhas vazia.");
    }

    return this.senhaRemovida; 
    
}

  public automatizado() {
    while(this.listaSenhas.ST.length > 0){
      this.chamarSenha()
    }
  }
  constructor() {
    this.automatizado()
  }
}

function includes(busca: string): any {
  throw new Error('Function not implemented.');
}

