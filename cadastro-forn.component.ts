import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

import { Fornecedor } from '../shared/fornecedor';

import { FornecedorService } from '../../../services/fornecedor.services';


@Component({
  selector: 'app-cadastro-forn',
  templateUrl: './cadastro-forn.html',
  styleUrls: ['./cadastro-forn.css']
})
export class FormularioFornecedor implements OnInit {
  formFornecedor: FormGroup;

  objetoRetorno:any;
    
  constructor(private formBuilder: FormBuilder, private clienteService: FornecedorService) { }

  ngOnInit() {
    this.createForm(new Fornecedor());
  }  
  
  createForm(fornecedor: Fornecedor) { 
    this.formFornecedor = this.formBuilder.group({
      nomeFantasia: [fornecedor.nomeFantasia, Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      nomeResponsavel: [fornecedor.nomeResponsavel, Validators.compose([
        Validators.pattern('[a-zA-ZÀ-ú ]'),
      ])],
      cpfCnpj: [fornecedor.cpfCnpj, Validators.required],
      inscricaoEstadual: [fornecedor.inscricaoEstadual, Validators.compose([
        Validators.pattern('[0-9]*'),
        Validators.minLength(9),
        Validators.maxLength(9)
      ])],
      endereco: [fornecedor.endereco, Validators.compose([
        Validators.minLength(3)
      ])],
      cidade: [fornecedor.cidade, Validators.compose([
        Validators.pattern('[a-zA-Z ]*'),
        Validators.minLength(3),
      ])],
      uf: [fornecedor.uf, Validators.compose([
        Validators.pattern('[a-zA-Z ]*'),
        Validators.minLength(3),
      ])],
      contato: [fornecedor.contato],
      contato2: [fornecedor.contato2],
      email: [fornecedor.email, Validators.email],
      senha: [fornecedor.senha, Validators.compose([Validators.minLength(6), Validators.maxLength(12)])]
    })
  }
  
    /*validarCampoOnBlur($event) {
    //valida o campo quando perde o foco
    if ($event.target.value == "") {
      //console.log("entrou1")
      if ($event.target.className.indexOf("invalido") == -1)
      $event.target.className += " invalido";
    }
    else {
      if ($event.target.value.length <= 2) { 
      
      }
      else
      $event.target.className = $event.target.className.replace("invalido", '');
    }
  }

    validarCampoKeyUp($event) {
    //tira campo vermelho quando começar a digitar letras > 2
    if ($event.target.value.length >= 2) {
      $event.target.className = $event.target.className.replace("invalido", '');
    }
    else {
      if ($event.target.value.length <= 2) { 
      
      }
      else
        $event.target.className = $event.target.className.replace("invalido", '');
    }
    }
    */
  

    cadastrado() {
    alert('Cadastrado com sucesso!')
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
    else if (this.validaCNPJ(this.formFornecedor.value.cpfCnpj) || this.validaCPF(this.formFornecedor.value.cpfCnpj)) {
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
  
  invalido = true;
  Valido() {
    //if (this.formFornecedor.controls.nomeFantasia.valid)
    if (this.formFornecedor.controls.nomeFantasia.valid && this.formFornecedor.controls.nomeResponsavel.valid && this.cpfCnpj && this.formFornecedor.controls.uf.valid
      && this.formFornecedor.controls.cidade.valid && this.formFornecedor.controls.endereco.valid
      && this.formFornecedor.controls.contato.valid && this.formFornecedor.controls.email.valid && this.formFornecedor.controls.senha.valid) {
      this.invalido = false;
    }
    else {
      this.invalido = true;
    }
  }

  onSubmit() {
    console.log(this.formFornecedor.value)

    this.clienteService.saveFornecedor(this.formFornecedor.value).subscribe(
      (response)=>this.objetoRetorno = response
    );
    this.objetoRetorno = this.objetoRetorno.data.msg.msg
  }

}