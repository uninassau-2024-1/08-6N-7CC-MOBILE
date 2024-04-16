import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public listaSenhas : any;

  proximaSenha : string = '';


  constructor(public senhasService: SenhasService) {
    
  }

}
