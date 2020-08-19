import { User } from './user';
import { Pais } from './pais.domain';

export class Aluno {
  public _id: string;
  public codigoAluno: number;
  public nome: string;
  public pais: Pais;
  public observacoes: string[];
  public interesses: string[];
  public professor: User;
}
