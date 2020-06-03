import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.services';
import { Cliente } from '../../../models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente.html',
  styleUrls: ['./cliente.css']
})

export class FormularioCliente implements OnInit {
  formCliente: FormGroup;

  objetoRetorno:any;

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private router: Router ) { }

  ngOnInit() {
    this.createForm(new Cliente());
  }

  createForm(cliente: Cliente) {
    this.formCliente = this.formBuilder.group({
      nome: [cliente.nome, Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZÀ-ú ]*'),
        Validators.minLength(3)
      ])],
      genero: [cliente.genero],
      dataNascimento: [cliente.dataNascimento],
      //tipo: [cliente.tipo],
      cpfCnpj: [cliente.cpfCnpj],
      uf: [cliente.uf, Validators.compose([
        Validators.pattern('[a-zA-ZÀ-ú ]*'),
        Validators.minLength(3),
      ])],
      cidade: [cliente.cidade, Validators.compose([
        Validators.pattern('[a-zA-ZÀ-ú ]*'),
        Validators.minLength(3),
      ])],
      endereco: [cliente.endereco, Validators.compose([
        Validators.minLength(3)
      ])],
      bairro: [cliente.bairro, Validators.compose([
        Validators.minLength(3)
      ])],
      contato: [cliente.contato],
      //contato2: [cliente.contato],
      email: [cliente.email],
      senha: [cliente.senha, Validators.compose([
        Validators.minLength(8), Validators.maxLength(16)])]

    })
  }

  

validaCNPJ(cnpj) {
      if (cnpj == undefined || cnpj.length == 0) {
          return false;
      }
      cnpj = ((cnpj + "").replace(/[^\d]+/g, '') + "");
      if (cnpj == '')
          return false;
      if (cnpj.length != 14)
          return false;
      // Elimina CNPJs invalidos conhecidos
      if (cnpj == "00000000000000" ||
              cnpj == "11111111111111" ||
              cnpj == "22222222222222" ||
              cnpj == "33333333333333" ||
              cnpj == "44444444444444" ||
              cnpj == "55555555555555" ||
              cnpj == "66666666666666" ||
              cnpj == "77777777777777" ||
              cnpj == "88888888888888" ||
              cnpj == "99999999999999")
          return false;
      // Valida DVs
      var tamanho = cnpj.length - 2;
      var numeros = cnpj.substring(0, tamanho);
      var digitos = cnpj.substring(tamanho);
      var soma = 0;
      var pos = tamanho - 7;
      for (var i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
              pos = 9;
      }
      var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0))
          return false;

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
              pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1))
          return false;
      return true;
    }
    
    
    validaCPF(cpf) {
      cpf = ((cpf + "").replace(/[^\d]+/g, '') + "");
      if (cpf == '')
        return false;
    // Elimina CPFs invalidos conhecidos    
      if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
      // Valida 1o digito 
      var add = 0;
      for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
      var rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
        rev = 0;
      if (rev != parseInt(cpf.charAt(9)))
        return false;
      // Valida 2o digito 
      add = 0;
      for (var i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
      rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
        rev = 0;
      if (rev != parseInt(cpf.charAt(10)))
        return false;
      return true;
    }
  
  resultado: string = "SemErro";
  cpfCnpj: boolean;
  validarDados($event) {
    if ($event.target.value.length < 11) { 
      this.resultado = "alert alert-danger";
      this.cpfCnpj = false;
    }
    else if (this.validaCNPJ(this.formCliente.value.cpfCnpj) || this.validaCPF(this.formCliente.value.cpfCnpj)) {
      $event.target.className = $event.target.className.replace (" ng-invalid", "  ng-valid");
      this.resultado = "SemErro";
      this.cpfCnpj = true;
      return true;
    }
    else if ($event.target.className.indexOf("ng-invalid") == -1 ) {
      $event.target.className = $event.target.className.replace (" ng-valid", " ng-invalid");
      this.resultado = "alert alert-danger";
      this.cpfCnpj = false;
      return false;
    }
  }
  
  
  maskCpfCnpj: string;
  mascaraCpfCnpj($event) {
    var tamanho = $event.target.value.length;
    if (tamanho <= 14) {
      this.maskCpfCnpj = '000.000.000-000';
    }
    else if (tamanho >= 15){
      this.maskCpfCnpj = '00.000.000/0000-00';
    }
  }

  maskContato = '(00) 0.0000-0000';

  mascaraContato($event) {
    var tamanho = $event.target.value.length;
    if (tamanho < 15) {
      this.maskContato = '(00) 0000-00000'
      if (tamanho == 14) {
        $event.target.className = $event.target.className.replace(" ng-invalid", " ng-valid");
      }
    }
    else if (tamanho >= 15){
      this.maskContato = '(00) 0.0000-0000'
    }
  }

  onSubmit() { 
    if (
      this.formCliente.controls.nome.valid &&
      this.formCliente.controls.genero.valid &&
      this.formCliente.controls.dataNascimento.valid &&
      this.formCliente.controls.email.valid &&
      this.formCliente.controls.contato.valid &&
      this.cpfCnpj &&
      this.formCliente.controls.endereco.valid &&
      this.formCliente.controls.cidade.valid &&
      this.formCliente.controls.uf.valid &&
      this.formCliente.controls.senha.valid)
    {
          this.resultado = "SemErro";
          this.clienteService.saveCliente(this.formCliente.value).subscribe(
          (response:any)=> {
              if (response.cod == "200") {
                  this.router.navigate(['/login'])
                  this.resultado = "SemErro"
                  alert("Cadastro realizado com sucesso!")
              }
              else if (response.cod == "300") {
                  this.resultado = "alert alert-danger"
                  alert(response.msg)
              }
              else if (response.cod == "400") {
                alert("CPF ou Cnpj já cadastrado!")
              }
            }
          );
    }
    else {
      this.formCliente.controls.nome.markAsTouched();
      this.formCliente.controls.genero.markAsTouched();
      this.formCliente.controls.dataNascimento.markAsTouched();
      this.formCliente.controls.email.markAsTouched();
      this.formCliente.controls.contato.markAsTouched();
      this.formCliente.controls.cpfCnpj.markAsTouched();
      this.formCliente.controls.endereco.markAsTouched();
      this.formCliente.controls.cidade.markAsTouched();
      this.formCliente.controls.uf.markAsTouched();
      this.formCliente.controls.senha.markAsTouched();
      this.resultado = "alert alert-danger";
      alert("Preencha os campos corretamente")
    }
  }
}