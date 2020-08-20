import { AulaService } from './../service/aula.service';
import { Aula } from './../domain/aula';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aula-list',
  templateUrl: './aula-list.component.html',
  styleUrls: ['./aula-list.component.css']
})
export class AulaListComponent implements OnInit {
  aulas: Aula[];
  aulaSelecionada: Aula;

  constructor(private readonly service: AulaService) { }

  ngOnInit(): void {
    this.buscarAulas();
  }

  selecionarAula(aula: Aula): void {
    this.aulaSelecionada = aula;
    // this.delete();
  }

  buscarAulas(): void {
    this.service.buscarAulas().subscribe((aulas) => {
      this.aulas = aulas;
    });
  }

}
