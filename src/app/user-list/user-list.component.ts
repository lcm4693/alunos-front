import { Component, OnInit } from '@angular/core';
import { User } from '../domain/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  userSelecionado: User;

  constructor(private readonly service: UserService) { }

  ngOnInit(): void {
    this.buscarUsers();
  }

  selecionarUser(user: User): void {
    this.userSelecionado = user;
    // this.delete();
  }

  buscarUsers(): void {
    this.service.buscarUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  // delete(): void {
  //   this.service.delete(this.alunoSelecionado._id).subscribe((afetados) => {
  //     if (afetados > 0) {
  //       this.alunos.splice(this.alunos.indexOf(this.alunoSelecionado), 1);
  //       this.alunoSelecionado = undefined;
  //     } else {
  //       console.log('###### Nada foi removido ####### ');
  //     }
  //   });
  // }

}
