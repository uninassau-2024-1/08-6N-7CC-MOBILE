import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPassword, IPasswordResponse } from '../interfaces/IPassword';
import { IMetrics } from '../interfaces/IMetrics';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private readonly API = 'http://localhost:3000/api/v1/ticket';

  constructor(
    private http: HttpClient
  ) { }

  createTicket(ticket: IPassword): Observable<IPasswordResponse> {
    return this.http.post<IPasswordResponse>(this.API, ticket);
  }

  listAllTPasswordsIsAttendanceTrue(): Observable<IPasswordResponse[]>{
    return this.http.get<IPasswordResponse[]>(this.API)
  }

  findLastAttendanceIsTrue(): Observable<IPasswordResponse>{
    return this.http.get<IPasswordResponse>(this.API + '/lastAttendance')
  }

  callAttendance(): Observable<IPasswordResponse>{
    return this.http.put<IPasswordResponse>(this.API + '/callAttendance', {})
  }

  metricsOfAttendance(): Observable<IMetrics>{
    return this.http.get<IMetrics>(this.API + '/count-by-prioritys', {})
  }
}
