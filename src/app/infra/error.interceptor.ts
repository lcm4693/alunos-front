import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from './../infra/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private accountService: AccountService,
    private readonly alertService: AlertService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.accountService.logout();
          return;
        }
        if (err.status === 504) {
          this.alertService.error('O servidor está indisponível no momento');
          return;
        }

        const error = err.error.message || err.statusText;

        this.alertService.error(
          'Ocorreu um erro desconhecido - HTTP STATUS: ' +
            err.status +
            ' - Message: ' +
            error
        );

        return throwError(error);
      })
    );
  }
}
