import { Injectable } from '@angular/core';
import { SenhasService } from './senhas.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private senhasService: SenhasService) { }

  

  // Método para obter a data atual no formato YYYY-MM-DD
  obterDataAtual(): string {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  // Método para obter a hora atual no formato HH:MM
  obterHoraAtual(): string {
    const dataAtual = new Date();
    const hora = dataAtual.getHours().toString().padStart(2, '0');
    const minuto = dataAtual.getMinutes().toString().padStart(2, '0');
    return `${hora}:${minuto}`;
  }



}
