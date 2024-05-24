import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Senha } from '../model/senha';

@Injectable({
  providedIn: 'root',
})
export class SenhasService {
  // public senhasGeral: number = 0;
  // public senhasPrior: number = 0;
  // public senhasExame: number = 0;
  // public senhasTotal: number = 0;


  // somaGeral() {this.senhasGeral++; this.senhasTotal++; }
  // somaPrior() {this.senhasPrior++; this.senhasTotal++; }
  // somaExame() {this.senhasExame++; this.senhasTotal++; }

  private apiUrl = 'http://localhost:5003/api/Senha/';
  private apiPainel = 'painel';

  constructor(private http: HttpClient) { }

  getAllSenhas(): Observable<Senha[]> {
    return this.http.get<Senha[]>(this.apiUrl);
  }

  getAllNextFiveSenhas(): Observable<Senha[]> {
    return this.http.get<Senha[]>(this.apiUrl+this.apiPainel);
  }

  getSenhaById(id: number): Observable<Senha> {
    const url = `${this.apiUrl}${id}`;
    return this.http.get<Senha>(url);
  }

  addSenha(senha: Senha): Observable<Senha> {
    return this.http.post<Senha>(this.apiUrl, senha);
  }

  updateSenha(senha: Senha): Observable<Senha> {
    const url = `${this.apiUrl}${senha.id}`;
    return this.http.put<Senha>(url, senha);
  }

  deleteSenha(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
