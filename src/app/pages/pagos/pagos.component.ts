import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClientesService } from 'src/app/services/clientes.service';
import { ReceiptsService } from 'src/app/services/receipts.service';

declare var $: any;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  public existCust = false;
  public formSubmitted = false;
  public btnLoading = false
  public crearSpinner: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public formSubmittedPay = false;

  public formPay = this.fb.group({
    documento: new FormControl('', Validators.required),
    nombre: new FormControl({ disabled: true }),
    apellido: new FormControl({ disabled: true }),
    total: new FormControl(''),
  });

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private custSrv: ClientesService,
    private recSrv: ReceiptsService
  ) { }

  ngOnInit(): void {
  }

  gotoBack() {
    this.location.back();
  }

  searchCustomer() {
    this.formSubmitted = true;
    if (this.formPay.invalid) {
      return;
    }
    this.btnLoading = true;
    this.custSrv.getCustomer(this.formPay.value.documento).subscribe((resp: any) => {
      this.btnLoading = false;
      var customer = resp;
      this.formPay.controls['nombre'].setValue(customer.name);
      //this.formPay.controls['nombre'].disable();
      this.formPay.controls['apellido'].setValue(customer.lastName);
      //this.formPay.controls['apellido'].disable();
      this.formPay.controls['total'].setValidators([Validators.required]);
      this.formPay.controls['total'].updateValueAndValidity();
      this.formPay.controls['documento'].setValidators([]);
      this.formPay.controls['documento'].updateValueAndValidity();
      this.existCust = true;


    }, (err) => {
      //En caso de un error
      var mensaje = err.error.message;
      if (err.error.message === 'Customer Not Found') {
        mensaje = 'Cliente no encontrado'
      }
      Swal.fire('Error', mensaje, 'error');
      this.btnLoading = false;
    })
  }

  /**
* Método para validar los campos del form
* @param campo => Valor del campo
*/
  public campoNoValido = (campo: any): boolean => {
    if (this.formPay.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  /**
* Método para validar los campos del form
* @param campo => Valor del campo
*/
  public campoNoValido2 = (campo: any): boolean => {
    if (this.formPay.get(campo)?.invalid && this.formSubmittedPay) {
      return true;
    } else {
      return false;
    }
  }

  /**Metodo para crear e imprimir el recibo */

  createReceipt() {
    console.log(this.formPay.value);

    this.formSubmittedPay = true;
    if (this.formPay.invalid) {
      return;
    }

    this.recSrv.createReceipt(this.formPay.value).subscribe((resp: any) => {
      alert("se creo factura");
      this.imprimir(this.formPay.value);
    }, (err) => {
      //En caso de un error
      Swal.fire('Error', JSON.stringify(err.error.errors), 'error');
    })

  }

  imprimir(infoPay: any) {

    const numeroRecibo = 12345678;
    const documento = infoPay.documento;
    const nombre = infoPay.nombre + ' ' + infoPay.apellido;
    const totalPagado = infoPay.total;

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Obtener los componentes de fecha y hora
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses empiezan en 0, se suma 1 para ajustar
    const año = fechaActual.getFullYear();
    const horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();
    const fecha = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;

    // Generar el contenido HTML con los datos dinámicos
    const contenido = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
        * {
        font-size: 12px;
        font-family: "Times New Roman", Times, serif;
      }

      td,
      th,
      tr,
      table {
        border-top: 1px solid black;
        border-collapse: collapse;

      }

      td.producto,
      th.producto {
        width: 75px;
        max-width: 75px;
      }

      td.cantidad,
      th.cantidad {
        width: 40px;
        max-width: 40px;
        word-break: break-all;
      }

      td.precio,
      th.precio {
        width: 40px;
        max-width: 40px;
        word-break: break-all;
      }

      .centrado {
        text-align: center;
        align-content: center;
        margin-top: 0px;
      }

      .ticket {
        width: 155px;
        max-width: 155px;
      }

      img {
        max-width: inherit;
        width: inherit;
      }

      .total {
        background-color: black;
        color: white;
      }

        </style>
    </head>
    <body>
        <div class="ticket">
            <img src="/assets/img/logos/LOGO DIBANET CIRCULO.png" alt="">
            <p class="centrado">DIBRANET SAS
                <br>901.498.416-6
            </p>
            <div class="centrado">
                <p>VARIEDADES VANNE LA MERCED
                    <br>CALLE 15 # 5-21
                </p>
            </div>
            <p>
                Recibo N. ${numeroRecibo}
                <br>Fecha: ${fecha}
            </p>
            <div>
                <p class="centrado">
                    <strong>CLIENTE</strong>
                    <br>CC: ${documento}
                    <br>${nombre}
                </p>
            </div>
            <div class="total">
                <strong>Total pagado: $${totalPagado}</strong>
            </div>
        </div>
    </body>
    </html>
  `;

    // Abrir una nueva ventana para la impresión
    const ventana = window.open('', '_blank');
    if (!ventana) {
      console.error('No se pudo abrir la ventana de impresión');
      return;
    }
    ventana.document.write(contenido);
    ventana.document.close();

    // Esperar a que el contenido se cargue antes de imprimir
    ventana.onload = function () {
      ventana?.print();
      ventana?.close();
    };
  }

}
