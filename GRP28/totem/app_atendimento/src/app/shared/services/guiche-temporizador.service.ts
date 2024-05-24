import { Injectable } from '@angular/core';
import { Guiche } from '../model/guiche';

@Injectable({
  providedIn: 'root'
})
export class GuicheTemporizadorService {
  private intervalos: any[] = [];

  constructor() {
    const storedIntervals = JSON.parse(localStorage.getItem('temporizadores') || '[]');
    this.intervalos = storedIntervals.map((storedInterval: any) => {
      const intervalo = setInterval(storedInterval.callback, storedInterval.intervalo);
      return intervalo;
    });
  }

  iniciarTemporizador(guiche: Guiche, callback: () => void) {
    const intervalo = setInterval(() => {
      if(guiche.tempo){

        guiche.tempo--;
        if (guiche.tempo <= 0) {
          clearInterval(intervalo);
          callback();
        }
      }
    }, 500);
    this.intervalos.push(intervalo);

    localStorage.setItem('temporizadores', JSON.stringify(this.intervalos.map(i => ({ callback, intervalo }))));
  }

  pararTemporizadores() {
    this.intervalos.forEach(intervalo => clearInterval(intervalo));
    this.intervalos = [];

    localStorage.removeItem('temporizadores');
  }
}
