import { Constants } from './../infra/constants';
import { User } from './../domain/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public cabecalhoRequests(): {} {
    return {
      headers: { Authorization: 'Bearer '.concat(this.userValue.access_token) },
    };
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public isAdmin(): boolean {
    return this.userSubject.value.roles.includes('ADMIN');
  }

  public isProfessor(): boolean {
    return this.userSubject.value.roles.includes('PROFESSOR');
  }

  public isAluno(): boolean {
    return this.userSubject.value.roles.includes('ALUNO');
  }

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${environment.urlBackend}/api/auth/login/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/'.concat(Constants.LOGIN)]);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.urlBackend}/users/register`,
      user
    );
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.urlBackend}/users`);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.urlBackend}/users/${id}`);
  }

  update(id, params): Observable<User> {
    return this.http
      .put<User>(`${environment.urlBackend}/users/${id}`, params)
      .pipe(
        map((x) => {
          // update stored user if the logged in user updated their own record
          if (id === this.userValue.id) {
            // update local storage
            const user = { ...this.userValue, ...params };
            localStorage.setItem('user', JSON.stringify(user));

            // publish updated user to subscribers
            this.userSubject.next(user);
          }
          return x;
        })
      );
  }

  delete(id: string): Observable<number> {
    return this.http
      .delete<number>(`${environment.urlBackend}/users/${id}`)
      .pipe(
        map((x) => {
          // auto logout if the logged in user deleted their own record
          if (id === this.userValue.id) {
            this.logout();
          }
          return x;
        })
      );
  }
}
