import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  private usuario: Usuario = new Usuario();
  
  objetoRetorno: any[];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }
  
  ngOnInit() {
    this.createForm(new Usuario());
  }

  createForm(usuario: Usuario) {
    this.formLogin = this.formBuilder.group({
      login: [usuario.login],
      senha: [usuario.senha]
    })
  }

  classeErro = "SemErro"
  retorno:object;
  teste = [];

  onSubmit() {

    this.authService.autenticar(this.formLogin.value).subscribe(
      (response:any)=> {
        if (response.cod == "200") {
          if (response.tipo == "F") {
            localStorage.setItem('user', response.user);
            this.router.navigate(['/fornecedor'])
            this.classeErro = "SemErro"
          }
          else if (response.tipo == "C") {
            localStorage.setItem('user', null);
            localStorage.setItem('user', response.user);
            this.router.navigate(['/home'])
            this.classeErro = "SemErro" 
          }
        }
        else if (response.cod == "300") {
          this.classeErro = "alert alert-danger"
          alert(response.msg)
        }
      }
    );
  }

}
