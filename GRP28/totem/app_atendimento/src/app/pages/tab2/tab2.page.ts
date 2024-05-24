import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { Guiche } from 'src/app/shared/model/guiche';
import { Senha } from 'src/app/shared/model/senha';
import { GuicheTemporizadorService } from 'src/app/shared/services/guiche-temporizador.service';
import { GuicheService } from 'src/app/shared/services/guiche.service';
import { RelatorioService } from 'src/app/shared/services/relatorio.service';
import { SenhasService } from 'src/app/shared/services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements ViewDidEnter, OnInit, OnDestroy{
  senhas: Senha[] = [];
  guiches: Guiche[] = [];
  intervalos: any[] = [];

  senha!: Senha;
  temporizador: any;

  constructor(
    private senhaService: SenhasService,
    private guicheService: GuicheService,
    private guicheTemporizadorService: GuicheTemporizadorService,
    private relatorioService: RelatorioService
  ) {}

  ngOnInit(): void {
    this.listarGuiche();
    this.guiches = JSON.parse(localStorage.getItem('guiches') || '[]');

  }

  ngOnDestroy(): void {
    this.guicheTemporizadorService.pararTemporizadores();
    // this.intervalos.forEach(intervalo => clearInterval(intervalo));
  }

  ionViewDidEnter(): void {
    this.listarProximas5Senhas();
  }

  listarProximas5Senhas() {
    this.senhaService.getAllNextFiveSenhas().subscribe((senhas) => {
      this.senha = senhas[0];
      senhas.shift();
      this.senhas = senhas;
    });
  }

  listarGuiche() {
    this.guicheService.getAllGuiches().subscribe((guiches) => {
      this.guiches = guiches;
    });
  }

  gerarTemporizador(tipo: string): number {
    let tempo: number;
    switch (tipo) {
      case "SG":
        tempo = Math.floor(Math.random() * 16) + 2;
        break;
      case "SP":
        tempo = Math.floor(Math.random() * 8) + 2;
        break;
      case "SE":
        tempo = Math.floor(Math.random() * 4) + 2;
        break;
      default:
        tempo = 0;
    }
    return tempo;
  }



  atender(senha: Senha) {
    const guicheDisponivel = this.guiches.find(guiche => guiche.statusDisponibilidade === 'D');
    if (guicheDisponivel) {
      guicheDisponivel.statusDisponibilidade = 'I';
      guicheDisponivel.tempo = this.gerarTemporizador(senha.tipoSenha);
      senha.statusAtendimento = 'A';
      senha.tempoMinuto = guicheDisponivel.tempo;
      this.senhaService.updateSenha(senha).subscribe(()=>{
        this.listarProximas5Senhas();
        this.relatorioService.autalizarDadosRelatorio().subscribe();

      })
      this.guicheService.updateGuiche(guicheDisponivel).subscribe(()=> {
        this.relatorioService.autalizarDadosRelatorio().subscribe();

      })
      this.guicheTemporizadorService.iniciarTemporizador(guicheDisponivel, () => {
        guicheDisponivel.statusDisponibilidade = 'D';
        this.relatorioService.autalizarDadosRelatorio().subscribe();

        this.guicheService.updateGuiche(guicheDisponivel).subscribe(()=>{
        this.relatorioService.autalizarDadosRelatorio().subscribe();

        })

      });
      localStorage.setItem('guiches', JSON.stringify(this.guiches));
    }
  }

  guichesDisponiveis(): boolean {
    return !this.guiches.some(guiche => guiche.statusDisponibilidade === 'D');
  }

}

