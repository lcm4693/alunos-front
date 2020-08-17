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

  constructor(
    private service: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.limparFormularios();
  }

  limparFormularios(): void {
    const usuario = new User();
    usuario.firstName = '';
    usuario.lastName = '';
    usuario.username = '';
    usuario.password = '';

    this.usuarioForm = this.formBuilder.group(usuario);
  }

  onSubmit(usuario: User): void {
    this.service.criar(usuario).subscribe((afetados) => {
      this.limparFormularios();
      this.router.navigate(['/'.concat(Constants.ALUNOS_LIST)]);
    });
  }
}
