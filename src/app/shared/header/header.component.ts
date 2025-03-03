import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authSrv: AuthService
  ) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#00afef',
      cancelButtonColor: '#ff4444',
      confirmButtonText: 'Si, Cerrar sesión!'
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => { this.router.navigateByUrl('/login'); }, 700);
        this.authSrv.logOutService();
      }
    })
  }

}
