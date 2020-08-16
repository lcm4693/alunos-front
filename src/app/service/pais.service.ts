import { Pais } from './../domain/pais.domain';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  constructor(private http: HttpClient) {}

  private paisURLBase = environment.urlBackend + '/api/pais';

  getAll(): Observable<Pais[]> {
      const paises = this.http.get<Pais[]>(this.paisURLBase + '/paises');
      return paises;
  }

  criar(pais: Pais): Observable<number> {
    const numeroAfetados = this.http.post<number>(this.paisURLBase + '/criar/', pais);
    return numeroAfetados;
  }

}
