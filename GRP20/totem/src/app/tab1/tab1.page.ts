import { Component } from '@angular/core';

import { SenhasService } from '../services/senhas.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  inputNovaSenha: string = '';
  inputSenhaChamada: string= '';
  chamarSenha(tipoSenha: string): void {
    this.senhasService.chamarProximaSenha();
  }
  constructor(public senhasService: SenhasService) {
    
  }

}
