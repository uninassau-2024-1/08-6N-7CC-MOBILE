import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(public senhasService: SenhasService) {}

  // Métodos para calcular os relatórios
  calcularQuantitativoGeralEmitidas(): number {
    return this.senhasService.senhas.length;
  }

  calcularQuantitativoGeralAtendidas(): number {
    return this.senhasService.ultimasSenhasChamadas.length;
  }

  calcularQuantitativoPorPrioridade(tipo: string): number {
    return this.senhasService.senhas.filter(senha => senha.icon === this.senhasService.getIcon(tipo)).length;
  }

  calcularQuantitativoAtendidasPorPrioridade(tipo: string): number {
    return this.senhasService.ultimasSenhasChamadas.filter(senha => senha.icon === this.senhasService.getIcon(tipo)).length;
  }
}
