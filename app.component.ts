import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.services';
import { Cliente } from '../../models/cliente';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent  {

  title = 'underlineEventos';

  cliente = {} as Cliente;
  clientes: Cliente[];

  constructor(private clienteService: ClienteService) {}
  
  ngOnInit() {
    this.getClientes();
  }

  // Defini se um Cliente será criado ou atualizado
  saveCliente(form: NgForm) {
    console.log(this.cliente.cpf_cnpj);
    if (this.cliente.cpf_cnpj !== undefined) {
        this.clienteService.updateCliente(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.clienteService.saveCliente(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obter todos os Clientes
  getClientes() {
    this.clienteService.getClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  // Deleta um Cliente
  deleteCliente(cliente: Cliente) {
    this.clienteService.deleteCliente(cliente).subscribe(() => {
      this.getClientes();
    });
  }

  // Copia o Cliente para ser editado.
  editCliente(cliente: Cliente) {
    this.cliente = { ...cliente };
  }

 // Limpa o formulario
  cleanForm(form: NgForm) {
    this.getClientes();
    form.resetForm();
    this.cliente = {} as Cliente;
  }

}
