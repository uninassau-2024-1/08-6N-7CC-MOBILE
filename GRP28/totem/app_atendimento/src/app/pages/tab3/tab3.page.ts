import { Relatorio } from './../../shared/model/relatorio';
import { Component } from '@angular/core';
import { SenhasService } from '../../shared/services/senhas.service';
import { RelatorioService } from 'src/app/shared/services/relatorio.service';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements ViewDidEnter {

  relatorios: Relatorio[] = []

  constructor(
    private relatorioService: RelatorioService
  ) {}

  ionViewDidEnter(): void {
    this.relatorioService.getAllRelatorios().subscribe((relatorios)=> {
      this.relatorios = relatorios
    })
  }


}
