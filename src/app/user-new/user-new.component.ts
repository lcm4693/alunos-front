import { AccountService } from './../infra/account.service';
import { Constants } from './../infra/constants';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../domain/user';

@Component({
  selector: 'app-user',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css'],
})
export class UserNewComponent implements OnInit {
  usuarioForm;
  roles: string[];
  constructor(
    private accountService: AccountService,
    private service: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.limparFormularios();
    if (this.accountService.userValue) {
      this.service.buscarRoles().subscribe((data) => {
        this.roles = data;
      });
    }
  }

  limparFormularios(): void {
    const usuario = new User();
    usuario.firstName = '';
    usuario.lastName = '';
    usuario.username = '';
    usuario.password = '';
    usuario.roles = [''];
    this.usuarioForm = this.formBuilder.group(usuario);
  }

  onSubmit(usuario: User): void {
    const logado = this.accountService.userValue ? true : false;
    this.service.criar(usuario, logado).subscribe((afetados) => {
      this.limparFormularios();
      this.router.navigate(['/'.concat(Constants.ALUNOS_LIST)]);
    });
  }
}
