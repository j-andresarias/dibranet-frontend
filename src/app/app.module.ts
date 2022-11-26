import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { LogPagosComponent } from './pages/log-pagos/log-pagos.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    NotpagefoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
