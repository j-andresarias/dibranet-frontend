import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    constructor(
        private routeActive: ActivatedRoute,
        private authSrv: AuthService,
        private router: Router,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Sesión Expirada',
                        text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        this.logOut();
                    });
                }

                return throwError(error);
            })
        );
    }

    /**
    * Método para cerrar sesión
    */
    public logOut = () => {
        setTimeout(() => { this.router.navigateByUrl('/login'); }, 700);
        this.authSrv.logOutService();
    }
}
