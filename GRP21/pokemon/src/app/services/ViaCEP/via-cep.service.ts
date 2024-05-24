import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private httpClient : HttpClient) { }
  getViaCEPService (cep: string = '52020212') {
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`)
  }
}




