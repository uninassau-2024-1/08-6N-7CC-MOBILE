import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private httpClient: HttpClient) { }

  getViaCEPService(cep: string):any{
    return this.httpClient.get<any>(`https://viacep.com.br/ws/${cep}/json/`)
  }

  getBrasilCEPService(cep: string):any{
    return this.httpClient.get<any>(`https://brasilapi.com.br/api/cep/v1/${cep}`)
  }

}
