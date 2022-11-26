import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { PagosComponent } from './pagos/pagos.component';
import { LogPagosComponent } from './log-pagos/log-pagos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AuthGuard } from '../guards/auth.guard';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';

const routes: Routes = [
  {
    path: 'home',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent},
      { path: 'pagos', component: PagosComponent},
      { path: 'log-pagos', component: LogPagosComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'crear-cliente', component: CrearClienteComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
