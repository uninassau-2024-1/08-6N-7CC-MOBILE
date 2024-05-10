// Classe para gerar senhas
class GeradorSenhas {
    dataAtual: Date;
    sequenciaPrioridade: { [prioridade: string]: number } = {};

    constructor(dataAtual: Date) {
        this.dataAtual = dataAtual;
    }

    // Método para emitir uma nova senha
    emitirSenha(tipo: 'SG' | 'SP' | 'SE'): { numero: string; tipo: string; dataHoraEmissao: Date } {
        const prioridade = this.calcularPrioridade(tipo);
        const numero = this.gerarNumeroSenha(tipo, prioridade);
        return {
            numero,
            tipo,
            dataHoraEmissao: new Date(this.dataAtual)
        };
    }

    // Método para calcular a prioridade 
calcularPrioridade(tipo: string): string {
    
    let prioridade: string = '0'; 

    
    switch (tipo) {
        case 'SG':
            prioridade = '0';
            break;
        case 'SP':
            prioridade = '1';
            break;
        case 'SE':
            prioridade = '2';
            break;
        default:
            prioridade = '0'; 
            break;
    }

    // Adicionando lógica para ajustar a prioridade com base no horário do dia
    const horaAtual = this.dataAtual.getHours();
    if (horaAtual >= 8 && horaAtual < 12) {
        
        prioridade = String.fromCharCode(prioridade.charCodeAt(0) + 3); 
    } else if (horaAtual >= 12 && horaAtual < 16) {
        
    } else if (horaAtual >= 16 && horaAtual < 20) {
        
        prioridade = String.fromCharCode(prioridade.charCodeAt(0) - 3); 
    } else {
        
        prioridade = '0';
    }

    return prioridade;
}

    // Método para gerar o número da senha
    gerarNumeroSenha(tipo: string, prioridade: string): string {
        const YY = this.dataAtual.getFullYear().toString().slice(-2);
        const MM = (this.dataAtual.getMonth() + 1).toString().padStart(2, '0');
        const DD = this.dataAtual.getDate().toString().padStart(2, '0');
        
        if (!this.sequenciaPrioridade[prioridade]) {
            this.sequenciaPrioridade[prioridade] = 1;
        }
        const SQ = this.sequenciaPrioridade[prioridade].toString().padStart(3, '0');
        
        this.sequenciaPrioridade[prioridade]++;
        return `${YY}${MM}${DD}-${tipo}${prioridade}-${SQ}`;
    }
}

// Classe para o sistema de controle de atendimento
class SistemaAtendimento {
    dataAtual: Date;
    geradorSenhas: GeradorSenhas;
    filaEspera: { numero: string; tipo: string; dataHoraEmissao: Date }[] = [];
    senhasAtendidas: { numero: string; tipo: string; dataHoraEmissao: Date }[] = [];

    constructor(dataAtual: Date) {
        this.dataAtual = dataAtual;
        this.geradorSenhas = new GeradorSenhas(dataAtual);
    }

    // Método para chamar o próximo na fila
    chamarProximo(): { numero: string; tipo: string; dataHoraEmissao: Date } | null {
        if (this.filaEspera.length === 0) {
            console.log("Não há mais senhas na fila.");
            return null;
        }
        const proximaSenha = this.filaEspera.shift();
        if (proximaSenha) {
            this.senhasAtendidas.push(proximaSenha);
            return proximaSenha;
        }
        return null;
    }

    // Método para encerrar o expediente de trabalho
    encerrarExpediente() {
        this.filaEspera = [];
        this.senhasAtendidas = [];
    }

    // Método para gerar relatório diário
gerarRelatorioDiario(): {
    senhasEmitidas: number;
    senhasAtendidas: number;
    senhaPorPrioridade: { [key: string]: number };
    detalhado: { numero: string; tipo: string; dataHoraEmissao: Date }[];
} {
    // Contagem de senhas por prioridade
    const senhaPorPrioridade: { [key: string]: number } = {};
    this.senhasAtendidas.forEach(senha => {
        const prioridade = senha.numero.split('-')[1]; 
        senhaPorPrioridade[prioridade] = (senhaPorPrioridade[prioridade] || 0) + 1;
    });

    // Retorna o relatório diário
    return {
        senhasEmitidas: this.senhasAtendidas.length + this.filaEspera.length,
        senhasAtendidas: this.senhasAtendidas.length,
        senhaPorPrioridade,
        detalhado: this.senhasAtendidas.concat(this.filaEspera)
    };
    }

    // Método para gerar relatório mensal
gerarRelatorioMensal(): {
    senhasEmitidas: number;
    senhasAtendidas: number;
    senhaPorPrioridade: { [key: string]: number };
    detalhado: { numero: string; tipo: string; dataHoraEmissao: Date }[];
} {
    // Contagem de senhas por prioridade
    const senhaPorPrioridade: { [key: string]: number } = {};
    this.senhasAtendidas.forEach(senha => {
        const prioridade = senha.numero.split('-')[1]; 
        senhaPorPrioridade[prioridade] = (senhaPorPrioridade[prioridade] || 0) + 1;
    });

    // Retorna o relatório mensal
    return {
        senhasEmitidas: this.senhasAtendidas.length + this.filaEspera.length,
        senhasAtendidas: this.senhasAtendidas.length,
        senhaPorPrioridade,
        detalhado: this.senhasAtendidas.concat(this.filaEspera)
    };
    }
}


const gerador = new GeradorSenhas(new Date());
console.log(gerador.emitirSenha('SG'));
console.log(gerador.emitirSenha('SP'));
console.log(gerador.emitirSenha('SE'));