import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

const BASE_URL: String = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  public httpOptions: any = {};

  constructor(
    private http: HttpClient
  ) {
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  /**
* Método de servicio para obtener todos los clientes
*/
  public getClientes = () => {
    return this.http.get(`${BASE_URL}/clientes`, this.httpOptions).pipe(
      map(resp => resp)
    )
  }
}
