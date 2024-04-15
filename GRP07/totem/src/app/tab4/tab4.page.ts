import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(private senhasService: SenhasService) {}

  // Aqui você pode chamar os métodos do serviço conforme necessário
  iniciarExpediente() {
    this.senhasService.iniciarExpediente();
  }

  encerrarExpediente() {
    this.senhasService.encerrarExpediente();
  }

  novaSenha(tipoSenha: string) {
    this.senhasService.novaSenha(tipoSenha);
  }
}