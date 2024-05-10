import { Injectable } from "@angular/core";

export interface Senha {
  icon: string;
  color: string;
  senha: string;
  tm_geracao: string;
}

@Injectable({
  providedIn: 'root',
})
export class SenhasService {
  constructor() {}

  public senhas: Senha[] = [];
  private sequencias: { [tipo: string]: number } = {};
  ultimasSenhasChamadas: Senha[] = [];
  private totalSenhasEmitidas = 0; // Contador para o total de senhas emitidas

  gerarSenha(tipo: string): string {
    const now = new Date();
    const formattedDate = `${now.getFullYear().toString().substr(-2)}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
    
    if (!this.sequencias[tipo]) {
      this.sequencias[tipo] = 1;
    } else {
      this.sequencias[tipo]++;
    }

    const sequenciaFormatada = this.sequencias[tipo].toString().padStart(2, '0');
    const senha = `${formattedDate}-${tipo}${sequenciaFormatada}`;
    
    this.senhas.push({
      icon: this.getIcon(tipo),
      color: this.getColor(tipo),
      senha,
      tm_geracao: now.toLocaleString(),
    });
    this.totalSenhasEmitidas++;
    return senha;
  }
 //Método para obter o total de senhas emitidas
  getTotalSenhasEmitidas(): number {
    return this.totalSenhasEmitidas;
  }

  chamarSenha() {
    let proximaSenha: Senha | undefined;
  
    // Definir uma função auxiliar para encontrar e chamar a próxima senha
    const chamarProxima = (tipo: string) => {
      const index = this.senhas.findIndex(senha => senha.senha.includes(tipo));
      if (index !== -1) {
        proximaSenha = this.senhas.splice(index, 1)[0];
        console.log('Próxima senha chamada:', proximaSenha.senha);
        this.adicionarSenhaChamada(proximaSenha);
      }
    };
  
    // Chamar senhas prioritárias (SP)
    chamarProxima('SP');
  
    // Chamar senhas para retirada de exames (SE), se ainda não tiver chamado uma senha
    if (!proximaSenha) {
      chamarProxima('SE');
    }
  
    // Chamar próxima senha geral (SG), se ainda não tiver chamado uma senha
    if (!proximaSenha) {
      chamarProxima('SG');
    }
  
    // Se não houver mais senhas disponíveis
    if (!proximaSenha) {
      console.log('Não há mais senhas disponíveis.');
    }
  }
  
  private adicionarSenhaChamada(senha: Senha) {
    // Adiciona a senha chamada no início da lista de últimas senhas chamadas
    this.ultimasSenhasChamadas.unshift(senha);
    // Verificar se a lista de últimas senhas chamadas excede 5 e, se sim, remover as mais antigas
    if (this.ultimasSenhasChamadas.length > 5) {
      this.ultimasSenhasChamadas.pop(); // Remove o último elemento da lista
    }
  }

  // Método para calcular o total de senhas atendidas
  getTotalSenhasAtendidas(): number {
    return this.ultimasSenhasChamadas.length;
  }

  public getIcon(tipo: string) {
    switch (tipo) {
      case 'SP':
        return 'accessibility';
      case 'SE':
        return 'document';
      case 'SG':
        return 'bandage';
      default:
        return '';
    }
  }

  public getColor(tipo: string) {
    switch (tipo) {
      case 'SP':
        return 'primary';
      case 'SE':
        return 'medium';
      case 'SG':
        return 'dark';
      default:
        return '';
    }
  }
}
