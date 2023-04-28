import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { CreateCustomerForm } from '../models/createcustForm';

const BASE_URL: String = environment.base_url2;

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
  public getCustomers = () => {
    return this.http.get(`${BASE_URL}/customers`, this.httpOptions).pipe(
      map(resp => resp)
    )
  }

  /**
   * Metodo para crear un cliente
   */
  public createCustomer = (formData: CreateCustomerForm) => {
    const json = {
      name: formData.nombre,
       lastName: formData.apellido,
      identificationType: formData.tipoDoc,
      identificationNumber: formData.documento,
      address: formData.direccion,
      phone: formData.telefono,
      email: formData.correo
    }
    return this.http.post(`${BASE_URL}/customers`, json, this.httpOptions).pipe(
      map(resp => resp)
    )
  }

  /**
   * Metodo para actualizar un cliente
   */
  public updateCustomer = (formData: CreateCustomerForm) => {
    const json = {
      name: formData.nombre,
      lastName: formData.apellido,
      /* identificationType: formData.tipoDoc,
      identificationNumber: formData.documento,
      address: formData.direccion,
      phone: formData.telefono,
      email: formData.correo */
    }
    return this.http.put(`${BASE_URL}/customers/${formData.documento}`, json, this.httpOptions).pipe(
      map(resp => resp)
    )
  }

    /**
* Método de servicio para obtener cliente por cedula
*/
public getCustomer = (document:any) => {
  return this.http.get(`${BASE_URL}/customers/${document}`, this.httpOptions).pipe(
    map(resp => resp)
  )
}
}
