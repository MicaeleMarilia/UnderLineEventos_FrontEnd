import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormularioFornecedor } from './cadastro/fornecedor/formulario/cadastro-forn.component';
import { FormularioCliente } from './cadastro/cliente/formulario/cliente-formulario'
import { CadastroComponent } from './cadastro/cadastro.component'
import { HomeFornecedorComponent } from './cadastro/fornecedor/home-fornecedor/home-fornecedor.component'
import { CadastroServicoComponent } from './cadastro/fornecedor/cadastro-servico/cadastro-servico.component'



const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro/fornecedor', component: FormularioFornecedor },
  { path: 'cadastro/cliente', component: FormularioCliente },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'fornecedor', component: HomeFornecedorComponent },
  { path: 'fornecedor/cadastroservico', component: CadastroServicoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})

export class AppRoutingModule {}