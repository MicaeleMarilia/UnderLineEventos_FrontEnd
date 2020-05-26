import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule, IConfig } from 'ngx-mask';

import { AppComponent } from './app.component';
//import { routing } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormularioFornecedor } from './cadastro/fornecedor/formulario/cadastro-forn.component';
import { FormularioCliente } from './cadastro/cliente/formulario/cliente-formulario';
import { CadastroComponent } from './cadastro/cadastro.component'

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FormularioFornecedor,
    FormularioCliente,
    CadastroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  //  routing
    NgxMaskModule.forRoot(options),
    HttpClientModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 