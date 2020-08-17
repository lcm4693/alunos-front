import { AccountService } from './../infra/account.service';
import { Aluno } from './../domain/aluno.domain';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private accountService: AccountService, private http: HttpClient) {}

  private alunoURLBase = environment.urlBackend + '/api/aluno';

  buscarAlunos(): Observable<Aluno[]> {
    const alunos = this.http.get<Aluno[]>(this.alunoURLBase + '/alunos');
    return alunos;
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
