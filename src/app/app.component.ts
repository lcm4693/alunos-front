import { Constants } from './infra/constants';
import { Component } from '@angular/core';
import { User } from './domain/user';
import { AccountService } from './infra/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'alunos-front';

  user: User;

  constructor(private router: Router, private accountService: AccountService) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  verificarUsuarioPossuiRole(roles: string[]): boolean {
    for (const role of roles) {
      if (this.user.roles.includes(role)) {
        return true;
      }
    }

    return false;
  }

  listaAlunos(): Promise<boolean> {
    return this.router.navigate(['/'.concat(Constants.ALUNOS_LIST)]);
  }

  novoAluno(): Promise<boolean> {
    return this.router.navigate(['/'.concat(Constants.ALUNO_NEW)]);
  }

  novoPais(): Promise<boolean> {
    return this.router.navigate(['/'.concat(Constants.PAIS_NEW)]);
  }

  novoUsuario(): Promise<boolean> {
    return this.router.navigate(['/'.concat(Constants.USER_NEW)]);
  }

  listaUsers(): Promise<boolean> {
    return this.router.navigate(['/'.concat(Constants.USER_LIST)]);
  }

  logout(): void {
    this.accountService.logout();
  }
}
