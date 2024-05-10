import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  ultimaSenhaGerada: { senha: string, tipo: string, icon: string } = { senha: '', tipo: '', icon: '' };

  constructor(public senhasService: SenhasService) {}

  gerarSenha(tipo: string) {
    const senha = this.senhasService.gerarSenha(tipo);
    const senhaInfo = { senha, tipo, icon: this.senhasService.getIcon(tipo) };
    
    this.ultimaSenhaGerada = senhaInfo;
  }
}
