import { Aluno } from './../domain/aluno.domain';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private http: HttpClient) {}

  private alunoURLBase = '/api/aluno';

  buscarAlunos(): Observable<Aluno[]> {
    const alunos2 = this.http.get<Aluno[]>(this.alunoURLBase + '/alunos');
    return alunos2;
  }

  delete(codigoAluno: string): Observable<number> {
    const numeroAfetados = this.http.get<number>(this.alunoURLBase + '/remover/' + codigoAluno);
    return numeroAfetados;
  }
}
