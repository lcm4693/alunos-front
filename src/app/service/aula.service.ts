import { Aula } from './../domain/aula';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  constructor(private http: HttpClient) { }

  private alunoURLBase = environment.urlBackend + '/api/calendar';

  buscarAulas(): Observable<Aula[]> {
    const aulas = this.http.get<Aula[]>(this.alunoURLBase + '/list/');
    return aulas;
  }
}
