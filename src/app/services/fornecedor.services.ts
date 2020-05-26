import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Fornecedor } from '../models/fornecedor';
import { URL_API } from '../app.api';

@Injectable({
  providedIn: 'root'
})

export class FornecedorService {

  url = URL_API + 'fornecedor/'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os Fornecedors
  getFornecedors(): Observable<Fornecedor[]> {
    return this.httpClient.get<Fornecedor[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Fornecedor pelo id
  getFornecedorById(id: number): Observable<Fornecedor> {
    return this.httpClient.get<Fornecedor>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um Fornecedor
  saveFornecedor(Fornecedor: Fornecedor): Observable<Fornecedor> {
    
    return this.httpClient.post<Fornecedor>(this.url, JSON.stringify(Fornecedor), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Fornecedor
  updateFornecedor(Fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.httpClient.put<Fornecedor>(this.url + '/' + Fornecedor.cpfCnpj, JSON.stringify(Fornecedor), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Fornecedor
  deleteFornecedor(Fornecedor: Fornecedor) {
    return this.httpClient.delete<Fornecedor>(this.url + '/' + Fornecedor.cpfCnpj, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    console.log(error.error.data.msg.msg);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      return throwError(error.error.data.msg.msg);
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}