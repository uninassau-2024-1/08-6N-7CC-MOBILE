import { Component } from '@angular/core';
import { SenhasService } from '../../shared/services/senhas.service';
import { RelatorioService } from 'src/app/shared/services/relatorio.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private senhaService: SenhasService,
    private relatorioService: RelatorioService
  ) {}
  inputNovaSenha: string = 'YYMMDD-0000';

  gerarSenha(tipo: string): void {
    const data = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const ano = data.getFullYear().toString().slice(2);
    const mes = ('0' + (data.getMonth() + 1)).slice(-2);
    const dia = ('0' + data.getDate()).slice(-2);
    const tipoSenha = tipo === 'geral' ? 'SG' : tipo === 'exame' ? 'SE' : 'SP';

    let sequencia = localStorage.getItem(`${tipo}_sequencia`);
    if (!sequencia) {
      sequencia = '0';
    } else {
      sequencia = String(parseInt(sequencia) + 1);
    }
    localStorage.setItem(`${tipo}_sequencia`, sequencia);

    this.inputNovaSenha = `${ano}${mes}${dia}-${tipoSenha}${sequencia}`;

    const novaSenha = {
      tipoSenha: tipoSenha,
      dataHoraEmissao: null,
      dataHoraAtendimento: null,
      statusAtendimento: 'P',
      tempoMinuto: 0,
      numeroSenha: this.inputNovaSenha
    };


    this.senhaService.addSenha(novaSenha).subscribe(() => {
      console.log('Nova senha adicionada com sucesso.');
      this.relatorioService.autalizarDadosRelatorio().subscribe();

    }, error => {
      console.error('Erro ao adicionar nova senha:', error);
    });
  }
}
