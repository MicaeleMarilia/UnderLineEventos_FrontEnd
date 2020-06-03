import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { servico } from '../../../models/servico'
import { consultaServico } from 'src/app/services/consultaServico';
import { Router } from '@angular/router';
import { ServicoServices } from '../../../services/servico.services';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
 
@Component({
  selector: 'app-cadastro-servico',
  templateUrl: './cadastro-servico.component.html',
  styleUrls: ['./cadastro-servico.component.css']
})
export class CadastroServicoComponent implements AfterViewInit, OnInit {
  formServico: FormGroup;

  constructor(private formBuilder: FormBuilder,private consultaServico: consultaServico, private router: Router, private Servico: ServicoServices, private httpClient: HttpClient, private sanitizer: DomSanitizer) {
   }

  objetoRetorno: any;
  resultado: any;
  tipoServicoSelecionado = [];
  
  ngOnInit() {
    this.createForm(new servico());
  }

  createForm(servico: servico) {
    this.formServico = this.formBuilder.group({
      nomeServico: [servico.nomeServico, Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      opServico: [servico.tipoServico],
      capacidade: [servico.capacidade, Validators.compose([
        Validators.required,
      ])],
      qtdHrsMin: [servico.qtdHrsMin],
      qtdHrsMax: [servico.qtdHrsMax],
      descricao: [servico.descricao, Validators.compose([
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(500),
      ])],
      fotos: [servico.fotos],
      valor: [servico.valor, Validators.compose([
        Validators.pattern('[0-9]*')
      ])],
      user: [localStorage.getItem('user')]
    }) 
  }

  retornoServico: any;

  opServico() {
    // variável provisória para testar retorno do banco
    //     var retornoServico = [
    //   {id: 1,
    //   nome: "Banda"
    //   },
    //   {id: 2,
    //     nome: "Buffet",
    //   },
    //   {id:3,
    //     nome: "Casa"
    //   }
    // ];
  
      var opcao;
      opcao = '<option for="opServico" id="' + '00' + '"> ' + 'Selecione' + '</option>'
              this.teste.nativeElement.innerHTML += opcao;
  
      this.consultaServico.getServico().subscribe(
        (response:any)=> {
            for (var contador = 0; contador < response.length; contador++) {
              opcao = '<option value=' + response[contador].id + ' for="opServico" id="' + response[contador].id + '"> ' + response[contador].nome + '</option>'
              this.teste.nativeElement.innerHTML += opcao;
            } 
          }
      );
    }
    
    @ViewChild("opServico") teste: ElementRef;
    
    ngAfterViewInit() {
      this.opServico();
    }

  
  imgEvent: Array <File> = null;

  onFile(event){
    this.imgEvent = event.target.files;
  }

  imagens;

  @ViewChild("imgCadastrada") imgHTML: ElementRef;
  
  submitImg(idForn, idServ) {
    const img = new FormData();
    img.append('idForn', idForn);
    img.append('idServ', idServ)
        if (this.imgEvent) {
          for (var i = 0; i < this.imgEvent.length; i++) {
            img.append(('fotos' + i), this.imgEvent[i]);
          }
          this.Servico.saveImg(img).subscribe(
            (response: any) => {
              this.imagens = response;
              for (var a = 0; a < this.imagens.length; a++) {                  
                var novaImg = '<img src="' + this.imagens[a] + '">';
                this.imgHTML.nativeElement.innerHTML += novaImg;
              }
            }
          );
        }
  }

  onSubmit() {
       if (this.formServico.controls.nomeServico.valid &&
        //this.formServico.controls.tipoServico.valid &&
        this.formServico.controls.capacidade.valid &&
        this.formServico.controls.qtdHrsMin.valid &&
        this.formServico.controls.qtdHrsMax.valid &&
        this.formServico.controls.descricao.valid)
      {

            this.Servico.saveServico(this.formServico.value).subscribe(
            (response: any) => {
                if (response.cod == "200") {
                  this.submitImg(this.formServico.value.user, response.idServ)
                  this.router.navigate(['/fornecedor'])
                  this.resultado = "SemErro"
                  alert("Cadastro realizado com sucesso!")
                }
                else if (response.cod == "300") {
                    this.resultado = "alert alert-danger"
                    alert(response.msg)
                }
                else if (response.cod == "400") { 
                  alert("Serviço já cadastrado!")
                }
              }
            );
      }
      else {
        this.formServico.controls.nomeFantasia.markAsTouched();
        this.formServico.controls.nomeResponsavel.markAsTouched();
        this.formServico.controls.cpfCnpj.markAsTouched();
        this.formServico.controls.uf.markAsTouched();
        this.formServico.controls.cidade.markAsTouched();
        this.formServico.controls.endereco.markAsTouched();
        this.formServico.controls.contato.markAsTouched();
        this.formServico.controls.email.markAsTouched();
        this.formServico.controls.senha.markAsTouched();
        this.resultado = "alert alert-danger";      
      }
    
  }

}
