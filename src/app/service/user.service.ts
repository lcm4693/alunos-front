import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURLBase = environment.urlBackend + '/api/users';

  constructor(private http: HttpClient) {}

  criar(usuario: User, logado: boolean): Observable<number> {
    let url = '';
    if (logado) {
      url = '/criar/';
    } else {
      url = '/criarUser/';
    }
    const numeroAfetados = this.http.post<number>(
      this.userURLBase + url,
      usuario
    );
    return numeroAfetados;
  }

  buscarUsers(): Observable<User[]> {
    const users = this.http.get<User[]>(this.userURLBase + '/');
    return users;
  }

  buscarRoles(): Observable<string[]> {
    const roles = this.http.get<string[]>('/api/auth/roles');
    return roles;
  }
}
