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

  constructor(private http: HttpClient) { }

  criar(usuario: User): Observable<number> {
    const numeroAfetados = this.http.post<number>(this.userURLBase + '/criar/', usuario);
    return numeroAfetados;
  }

  buscarUsers(): Observable<User[]> {
    const users = this.http.get<User[]>(this.userURLBase + '/');
    return users;
  }

}
