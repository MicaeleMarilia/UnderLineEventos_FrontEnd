import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cliente } from '../models/cliente';
import { URL_API } from '../app.api';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  url = URL_API + 'clientes/'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os clientes
  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Cliente pelo id
  getClienteById(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um Cliente
  saveCliente(Cliente: Cliente): Observable<Cliente> {
    
    return this.httpClient.post<Cliente>(this.url, JSON.stringify(Cliente), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Cliente
  updateCliente(Cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(this.url + '/' + Cliente.cpfCnpj, JSON.stringify(Cliente), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Cliente
  deleteCliente(Cliente: Cliente) {
    return this.httpClient.delete<Cliente>(this.url + '/' + Cliente.cpfCnpj, this.httpOptions)
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