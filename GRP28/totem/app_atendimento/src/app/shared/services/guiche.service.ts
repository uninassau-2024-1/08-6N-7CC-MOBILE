import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guiche } from '../model/guiche';

@Injectable({
  providedIn: 'root'
})
export class GuicheService {

  private apiUrl = 'http://localhost:5003/api/Guiche/';

  constructor(private http: HttpClient) { }

  getAllGuiches(): Observable<Guiche[]> {
    return this.http.get<Guiche[]>(this.apiUrl);
  }

  getGuicheById(id: number): Observable<Guiche> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Guiche>(url);
  }

  addGuiche(guiche: Guiche): Observable<Guiche> {
    return this.http.post<Guiche>(this.apiUrl, guiche);
  }

  updateGuiche(guiche: Guiche): Observable<Guiche> {
    const url = `${this.apiUrl}${guiche.id}`;
    return this.http.put<Guiche>(url, guiche);
  }

  deleteGuiche(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
