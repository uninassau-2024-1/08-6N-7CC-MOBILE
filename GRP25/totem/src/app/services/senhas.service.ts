import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SenhasService {

  relatorioSenhas = {senhasGeralEmitidas: 0, senhasPriorEmitidas: 0, senhasExameEmitidas: 0, senhasTotalEmitidas: 0,
                     senhasGeralChamadas:0, senhasPriorChamadas:0, senhasExameChamadas:0, senhasTotalChamadas:0,}
  

  senhasPrioritarias : {tipo: string, icon: string, color: string, data: string, senha: string, tm_geracao:string}[] = []
  senhasExames : {tipo: string, icon: string, color: string, data: string, senha: string, tm_geracao:string}[] = []
  senhasGerais : {tipo: string, icon: string, color: string, data: string, senha: string, tm_geracao:string}[] = []
  senhasChamadas : {tipo: string, icon: string, color: string, data: string, senha: string, tm_geracao:string}[] = []
      
  public ultimaSenhaChamada: string = '';
 
  constructor() {
  }

  emitirSenha(inputNovaSenha: string) {

 
    const dataAtual = new Date();
    let senha = '';
    let tipo = '';
    let icon = '';
    let color = '';
    let tm_geracao = '';
    
    const horaAtual = dataAtual.getHours();
    const yy = dataAtual.getFullYear().toString();
    const mm = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const dd = dataAtual.getDate().toString().padStart(2, '0');

   // Verifica se está dentro do horário de expediente
   if (horaAtual < 7 || horaAtual >= 17) {
    console.log("Fora do horário de expediente. Não é possível emitir senhas.");
    return;
}
    switch (inputNovaSenha) {
      case 'geral':
        this.relatorioSenhas.senhasGeralEmitidas++;    //soma as senhas gerais emitidas
        this.relatorioSenhas.senhasTotalEmitidas++;
        senha = "SG0" + this.relatorioSenhas.senhasGeralEmitidas.toString();
        tipo = 'geral';
        icon = 'bandage';
        color = 'dark';
        tm_geracao = (Math.random() < 0.5 ? 5 - 3 : 5 + 3).toString(); // tm_geracao varia 3 minutos para baixo ou para cima
      break;
      case 'prior':
        this.relatorioSenhas.senhasPriorEmitidas++;    //Soma as senhas prioritarias emitidas
        this.relatorioSenhas.senhasTotalEmitidas++;
        senha = "SP0" +  this.relatorioSenhas.senhasPriorEmitidas.toString();
        tipo = 'prior';
        icon = 'accessibility';
        color = 'warning';
        tm_geracao = (Math.random() < 0.5 ? 15 - 5 : 15 + 5).toString(); // tm_geracao varia 5 minutos para baixo ou para cima
      break;
      case 'exame':
        this.relatorioSenhas.senhasExameEmitidas++;    //Soma as senhas exames emitidas
        this.relatorioSenhas.senhasTotalEmitidas++;
        senha = "SE0" + this.relatorioSenhas.senhasExameEmitidas.toString();
        tipo = 'exame';
        icon = 'document';
        color = 'tertiary';
        tm_geracao = (Math.random() < 0.95 ? 1 : 5).toString(); // tm_geracao é 1 minuto para 95% dos SA e 5 minutos para 5% dos SA
      break;
    }
    const novaSenha = {
      tipo: tipo,
      icon: icon,
      color: color,
      data: yy +'-'+ mm +'-'+ dd,
      senha: senha,
      tm_geracao: tm_geracao,
    };

    if (novaSenha.tipo == 'prior') {
      this.senhasPrioritarias.push(novaSenha);
      } 
      else if (novaSenha.tipo == 'exame') {
      this.senhasExames.push(novaSenha);
      } 
      else {
        this.senhasGerais.push(novaSenha);
      }
  }  

  public chamarSenha(){
    if (this.senhasPrioritarias.length > 0 || this.senhasGerais.length > 0 || this.senhasExames.length > 0) {
      
      if (this.senhasPrioritarias.length > 0 && this.senhasPrioritarias[0].tipo != this.ultimaSenhaChamada) {
        
        if(this.senhasExames.length === 0 && this.senhasGerais.length === 0 ){     //verifica se os vetores senhasExames e senhasGerais estão vazios
          this.ultimaSenhaChamada = '';                                           //caso seja TRUE ele chama a senha do mesmo tipo
          this.senhasChamadas.push(this.senhasPrioritarias[0]);
          this.senhasPrioritarias.splice(0, 1);
          this.relatorioSenhas.senhasPriorChamadas++;
          this.relatorioSenhas.senhasTotalChamadas++;
        }
          else{
          this.senhasChamadas.push(this.senhasPrioritarias[0]);
          this.senhasPrioritarias.splice(0, 1);
          this.ultimaSenhaChamada = 'prior';
          this.relatorioSenhas.senhasPriorChamadas++;           
          this.relatorioSenhas.senhasTotalChamadas++;
        }
      }
        else if (this.senhasExames.length > 0 && this.senhasExames[0].tipo != this.ultimaSenhaChamada) {

          if(this.senhasPrioritarias.length === 0 && this.senhasGerais.length === 0 ){    //verifica se os vetores senhasPrioritarias e senhasGerais estão vazios
            this.ultimaSenhaChamada = '';                                                //caso seja TRUE ele chama a senha do mesmo tipo
            this.senhasChamadas.push(this.senhasExames[0]);
            this.senhasExames.splice(0, 1);
            this.relatorioSenhas.senhasExameChamadas++;
            this.relatorioSenhas.senhasTotalChamadas++;
          }
            else{
              this.senhasChamadas.push(this.senhasExames[0]);
              this.senhasExames.splice(0, 1);
              this.ultimaSenhaChamada = 'exame';
              this.relatorioSenhas.senhasExameChamadas++;
              this.relatorioSenhas.senhasTotalChamadas++;
            }
      }
        else if (this.senhasGerais.length > 0 && this.senhasGerais[0].tipo != this.ultimaSenhaChamada ) {

          if(this.senhasPrioritarias.length === 0 && this.senhasExames.length === 0 ){      //verifica se os vetores senhasPrioritarias e senhasExames estão vazios
            this.ultimaSenhaChamada = '';                                                  //caso seja TRUE ele chama a senha do mesmo tipo
            this.senhasChamadas.push(this.senhasGerais[0]);
            this.senhasGerais.splice(0, 1);
            this.relatorioSenhas.senhasGeralChamadas++;
            this.relatorioSenhas.senhasTotalChamadas++;
          }
            else{
              this.senhasChamadas.push(this.senhasGerais[0]);
              this.senhasGerais.splice(0, 1);
              this.ultimaSenhaChamada = 'geral';
              this.relatorioSenhas.senhasGeralChamadas++;
              this.relatorioSenhas.senhasTotalChamadas++;
            }
        }
    }
    else{
      //
    }

    if(this.senhasChamadas.length > 5){   //verifica se o vetor senhasChamadas tem o tamanho maior que 5
      this.senhasChamadas.splice(0,1)     //caso seja TRUE ele apaga a senha mais antiga para poder chamar a nova 
    }

  }
}

 

  
  

