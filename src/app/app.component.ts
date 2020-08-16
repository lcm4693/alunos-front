import { Constants } from './infra/constants';
import { Component } from '@angular/core';
import { User } from './domain/user';
import { AccountService } from './account.service';
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

  listaAlunos(): Promise<boolean>{
    return this.router.navigate(['/'.concat(Constants.ALUNOS_LIST)]);
  }

  novoAluno(): Promise<boolean>{
    return this.router.navigate(['/'.concat(Constants.ALUNO_NEW)]);
  }

  novoPais(): Promise<boolean>{
    return this.router.navigate(['/'.concat(Constants.PAIS_NEW)]);
  }

  logout(): void {
    this.accountService.logout();
  }
}
