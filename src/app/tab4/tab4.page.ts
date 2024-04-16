import { Component, OnInit } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public senhasService : SenhasService) { }

  

  emitirUltimaSenhaRemovida() {
    this.senhasService.chamarSenha(); // Chama a função para remover a última senha
  }

  ngOnInit() {
  }

}
