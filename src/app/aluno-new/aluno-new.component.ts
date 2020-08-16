import { AlertService } from './../alert.service';
import { PaisService } from './../service/pais.service';
import { Pais } from './../domain/pais.domain';
import { Aluno } from './../domain/aluno.domain';
import { AlunoService } from './../service/aluno.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aluno-new',
  templateUrl: './aluno-new.component.html',
  styleUrls: ['./aluno-new.component.css'],
})
export class AlunoNewComponent implements OnInit {
  alunoForm;
  paises: Pais[];

  constructor(
    private formBuilder: FormBuilder,
    private service: AlunoService,
    private paisService: PaisService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.limparFormularios();
  }

  ngOnInit(): void {
    this.buscarPaises();
  }

  limparFormularios(): void {
    this.alunoForm = this.formBuilder.group({
      nome: '',
      pais: '',
    });
  }

  onSubmitAluno(aluno: Aluno): void {
    console.log(aluno);
    this.service.criar(aluno).subscribe((afetados) => {
      this.limparFormularios();
      this.alertService.success('O aluno ' + aluno.nome + ' foi criado com sucesso');
      // this.router.navigate(['/alunos-list']);
    });
  }

  buscarPaises(): void {
    this.paisService.getAll().subscribe((paises) => {
      this.paises = paises;
    });
  }
}
