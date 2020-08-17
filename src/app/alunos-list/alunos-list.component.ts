import { AlunoService } from './../service/aluno.service';
import { Aluno } from './../domain/aluno.domain';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-alunos-list',
  templateUrl: './alunos-list.component.html',
  styleUrls: ['./alunos-list.component.css'],
})
export class AlunosListComponent implements OnInit {
  alunos: Aluno[];
  alunoSelecionado: Aluno;

  constructor(
    private sanitizer: DomSanitizer,
    private service: AlunoService,
  ) {}

  ngOnInit(): void {
    this.buscarAlunos();
  }

  selecionarAluno(aluno: Aluno): void {
    this.alunoSelecionado = aluno;
    // this.delete();
  }

  buscarAlunos(): void {
    this.service.buscarAlunos().subscribe((alunos) => {
      this.alunos = alunos;
    });
  }

  delete(): void {
    this.service.delete(this.alunoSelecionado._id).subscribe((afetados) => {
      if (afetados > 0) {
        this.alunos.splice(this.alunos.indexOf(this.alunoSelecionado), 1);
        this.alunoSelecionado = undefined;
      } else {
        console.log('###### Nada foi removido ####### ');
      }
    });
  }

  getCountryImage(aluno: Aluno): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(aluno.pais.flag);
  }
}
