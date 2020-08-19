import { AccountService } from './../infra/account.service';
import { Constants } from './../infra/constants';
import { AlertService } from './../infra/alert.service';
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

  async onSubmitAluno(aluno: Aluno): Promise<void> {
    this.service.criar(aluno).subscribe(async (afetados) => {
      this.limparFormularios();
      await this.router.navigate([Constants.ALUNOS_LIST]);
      this.alertService.success('O aluno ' + aluno.nome + ' foi criado com sucesso');
    });
  }

  buscarPaises(): void {
    this.paisService.getAll().subscribe((paises) => {
      this.paises = paises;
    });
  }
}
