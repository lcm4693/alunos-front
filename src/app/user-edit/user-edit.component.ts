import { Constants } from './../infra/constants';
import { AccountService } from './../infra/account.service';
import { User } from './../domain/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  private usuarioLogado: User;
  usuarioForm;
  roles: string[];
  constructor(
    private accountService: AccountService,
    private service: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.usuarioLogado = accountService.userValue;
  }

  ngOnInit(): void {
    this.limparFormularios();
    if (this.accountService.userValue && this.accountService.isAdmin()) {
      this.service.buscarRoles().subscribe((data) => {
        this.roles = data;
      });
    }
  }

  limparFormularios(): void {
    const usuario = new User();
    usuario.firstName = this.usuarioLogado.firstName;
    usuario.lastName = this.usuarioLogado.lastName;
    usuario.username = this.usuarioLogado.username;
    usuario.password = '';
    usuario.padrao24 = this.usuarioLogado.padrao24;
    usuario.roles = this.usuarioLogado.roles;
    this.usuarioForm = this.formBuilder.group(usuario);
  }

  onSubmit(usuario: User): void {
    if (usuario.password === '') {
      usuario.password = undefined;
    }
    this.accountService.update(this.usuarioLogado.username, usuario).subscribe((usuarioRetornado) => {
      this.limparFormularios();
      this.router.navigate(['/'.concat(Constants.USER_LIST)]);
    });
  }
}
