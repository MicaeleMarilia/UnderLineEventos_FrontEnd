import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { URL_API } from '../app.api';
import { servico } from '../models/servico';

@Injectable({
  providedIn: 'root'
})

export class ServicoServices {

  url = URL_API + 'servicofornecedor/';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

 saveServico(Servico: servico): Observable < servico > {
    
    return this.httpClient.post<servico>(this.url, JSON.stringify(Servico), this.httpOptions)
      // .pipe(
      //   retry(2),
      //   catchError(this.handleError)
      // )
  }

httpOptionsData = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  }
  saveImg(img: FormData){
    //var url = 'http://localhost/teste.php'
    return this.httpClient.post(this.url, img)
    // .pipe(
    //   retry(2),
    //   catchError(this.handleError)
    // )
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