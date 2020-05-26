import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { URL_API } from '../app.api';

@Injectable({
  providedIn: 'root'
})

export class consultaServico {

  url = URL_API + 'tiposervico/'; // 

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
    
    getServico () {
        return this.httpClient.get(this.url)
        .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    // console.log(error.error.data.msg.msg);
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