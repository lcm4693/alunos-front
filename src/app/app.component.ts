import { Constants } from './infra/constants';
import { Component } from '@angular/core';
import { User } from './domain/user';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'alunos-front';

  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  listaAlunos(){
    console.log('CHAMOU Lista Alunos');
    return '/'.concat(Constants.ALUNOS_LIST);
  }

  novoAluno(){
    console.log('CHAMOU Novo Aluno');
    return '/'.concat(Constants.ALUNO_NEW);
  }

  novoPais(){
    console.log('CHAMOU NovoPais');
    return '/'.concat(Constants.PAIS_NEW);
  }

  logout(): void {
    console.log('CHAMOU LOGOUT');
    this.accountService.logout();
  }
}
