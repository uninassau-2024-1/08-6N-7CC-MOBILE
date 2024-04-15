import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public senhasService: SenhasService) {}

  chamarSenha(tipoSenha: string) {
    this.senhasService.novaSenha(tipoSenha);
  
    if (tipoSenha === 'SG') {
      const tempoRetencaoSG = this.senhasService.calcularTempoRetencao('SG');
      console.log('Tempo de retenção (SG):', tempoRetencaoSG, 'minutos');
      console.log('Proxima senha deverá ser uma SP')
    } else if (tipoSenha === 'SP') {
      const tempoRetencaoSP = this.senhasService.calcularTempoRetencao('SP');
      console.log('Tempo de retenção (SP):', tempoRetencaoSP, 'minutos');
      console.log('Proxima senha deverá ser uma SE')
    } else if (tipoSenha === 'SE') {
      const tempoRetencaoSE = this.senhasService.calcularTempoRetencao('SE');
      console.log('Tempo de retenção (SE):', tempoRetencaoSE, 'minutos');
      console.log('Proxima senha deverá ser uma SG')
    }
  }
  
  
}
