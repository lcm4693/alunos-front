import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoNewComponent } from './aluno-new.component';

describe('AlunoNewComponent', () => {
  let component: AlunoNewComponent;
  let fixture: ComponentFixture<AlunoNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunoNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
