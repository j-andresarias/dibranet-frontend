import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../models/loginForm';
import { catchError, map, tap } from 'rxjs/operators';

const BASE_URL: String = environment.base_url2;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public httpOptions: any = {};

  constructor(
    private http: HttpClient
  ) {
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  /**
   *
   * @returns Metodo para consumir el login
   */

  public login = (formData: LoginForm) => {
    const json = {
      username: "",
      email: formData.User,
      password: formData.Password
    }
    return this.http.post(`${BASE_URL}/auth/signin`, json, this.httpOptions).pipe(
      map(resp => resp)
    )
  }

  /**
* Método de servicio para obtener todos los clientes
*/
  public login2 = () => {
    return this.http.post(`${BASE_URL}/login`, this.httpOptions).pipe(
      map(resp => resp)
    )
  }
  /**
 * Método de servicio para validar token de seguridad
 */
  public validarToken = (): boolean => {
    const token = localStorage.getItem('token') || '';

    if (token) {
      return true;

    } else {
      return false;
    }

  }

  /**
 * Metodo de servicio para cerrar sesión
 */
  public logOutService = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  }

  /**
* Metodo de servicio para guardarToken
*/
  public logInService = (token:any, userName:string) => {

    let isAdmin = userName === "facturacion.dibranet@gmail.com" ? "false" : "true";
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', isAdmin);
  }
}
