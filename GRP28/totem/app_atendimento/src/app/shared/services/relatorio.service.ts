import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Relatorio } from '../model/relatorio';


@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private apiUrl = 'http://localhost:5003/api/Relatorio/';
  private apiUrlAtualizar = 'http://localhost:5003/api/Relatorio/atualizar/';

  constructor(private http: HttpClient) { }

  getAllRelatorios(): Observable<Relatorio[]> {
    return this.http.get<Relatorio[]>(this.apiUrl);
  }

  autalizarDadosRelatorio(): Observable<Relatorio> {
    return this.http.get<Relatorio>(this.apiUrlAtualizar);
  }


}
