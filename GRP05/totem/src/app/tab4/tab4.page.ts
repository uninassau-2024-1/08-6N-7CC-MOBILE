import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {
  ultimasSenhas: string[] = [];

  constructor(private senhasService: SenhasService) {
    this.atualizarUltimasSenhas();
  }

  gerarNovaSenha(tipoSenha: string) {
    if (this.senhasService.expedienteEmAndamento() && this.senhasService.isHorarioExpediente()) {
      this.senhasService.novaSenha(tipoSenha);
      this.atualizarUltimasSenhas();
    } else {
      console.log('Fora do horário de expediente.');
    }
  }

  private atualizarUltimasSenhas() {
    // Atualiza a lista de últimas senhas chamadas
    this.ultimasSenhas = this.senhasService.senhasChamadas.slice(-5);
  }
}