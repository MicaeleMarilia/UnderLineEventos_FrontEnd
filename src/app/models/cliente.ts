import { Data } from '@angular/router';

export class Cliente {
  nome: string;
  genero: number = 1;
  dataNascimento: Data;
  email: string;
  cpfCnpj: string;
  bairro: string;
  endereco: string;
  cidade: string;
  uf: string;
  contato: string;
  senha: string;
}