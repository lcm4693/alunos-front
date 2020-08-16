import { Constants } from './../infra/constants';
import { Pais } from './../domain/pais.domain';
import { PaisService } from './../service/pais.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pais-new',
  templateUrl: './pais-new.component.html',
  styleUrls: ['./pais-new.component.css'],
})
export class PaisNewComponent implements OnInit {
  paisForm;

  constructor(
    private paisService: PaisService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.limparFormularios();
  }

  limparFormularios(): void {
    this.paisForm = this.formBuilder.group({
      nomePais: '',
      nameEnglish: '',
      nameFrench: '',
      flag: '',
    });
  }

  onSubmitPais(pais: Pais): void {
    this.paisService.criar(pais).subscribe((afetados) => {
      this.limparFormularios();
      this.router.navigate(['/'.concat(Constants.ALUNOS_LIST)]);
    });
  }
}
