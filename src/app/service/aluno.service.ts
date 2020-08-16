import { Aluno } from './../domain/aluno.domain';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private http: HttpClient) {}

  private alunoURLBase = environment.urlBackend + '/api/aluno';

  buscarAlunos(): Observable<Aluno[]> {
    const alunos2 = this.http.get<Aluno[]>(this.alunoURLBase + '/alunos');
    return alunos2;
  }

  criar(aluno: Aluno): Observable<number> {
    const numeroAfetados = this.http.post<number>(this.alunoURLBase + '/criar/', aluno);
    return numeroAfetados;
  }

  delete(codigoAluno: string): Observable<number> {
    const numeroAfetados = this.http.get<number>(this.alunoURLBase + '/remover/' + codigoAluno);
    return numeroAfetados;
  }
}
