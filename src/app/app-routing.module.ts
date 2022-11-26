import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: NotpagefoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot( routes, {useHash: true} ),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
