import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { PayForm } from '../models/payForm';

const BASE_URL: String = environment.base_url2;

@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {

  public httpOptions: any = {};

  constructor(
    private http: HttpClient
  ) {
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  /**
   * Metodo para crear una factura o recibo
   */
  public createReceipt = (formData: PayForm, total: any) => {
    const json = {
      customerIdentification: formData.documento,
      totalValue: total,
      observation: 'pruebas',
    }
    return this.http.post(`${BASE_URL}/receipts`, json, this.httpOptions).pipe(
      map(resp => resp)
    )
  }

  /**
* Método de servicio para obtener todos los recibos de pago
*/
  public getReceipts = (estado: boolean) => {
    return this.http.get(`${BASE_URL}/receipts?isDeposited=${estado}`, this.httpOptions).pipe(
      map(resp => resp)
    )
  }

    /**
* Método de servicio para obtener todos los recibos de pago
*/
public getAllReceipts = (estado: boolean) => {
  return this.http.get(`${BASE_URL}/receipts`, this.httpOptions).pipe(
    map(resp => resp)
  )
}

  /**
* Método de servicio para actualizar el estado de un recibo
*/
  public updateReceipts = (idRecibo: number) => {
    const json = {
      isDeposited: true
    }
    return this.http.put(`${BASE_URL}/receipts/${idRecibo}`, json, this.httpOptions).pipe(
      map(resp => resp)
    )
  }

}
