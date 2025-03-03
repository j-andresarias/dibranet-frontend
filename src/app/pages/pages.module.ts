import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PagesComponent } from './pages.component';
import { LogPagosComponent } from './log-pagos/log-pagos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagosComponent } from './pagos/pagos.component';
import { SharedModule } from '../shared/shared.module';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { RegistroConsignacionesComponent } from './registro-consignaciones/registro-consignaciones.component';




@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    ClientesComponent,
    LogPagosComponent,
    PagosComponent,
    CrearClienteComponent,
    RegistroConsignacionesComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    HomeComponent,
    PagesComponent
  ]
})
export class PagesModule { }
