import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Location } from '@angular/common';
import { ReceiptsService } from 'src/app/services/receipts.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

declare var $: any;

@Component({
  selector: 'app-log-pagos',
  templateUrl: './log-pagos.component.html',
  styleUrls: ['./log-pagos.component.css']
})
export class LogPagosComponent implements OnInit {
  public receipts: Array<any> = [];
  public selectedReceipts: any[] = [];

  constructor(
    private location: Location,
    private recSrv: ReceiptsService
  ) { }

  ngOnInit(): void {
    this.updateFootable();
    this.getReceipts();
  }

  public getReceipts = () => {
    this.recSrv.getAllReceipts(false).subscribe((resp: any) => {
      this.receipts = resp.receipts;

      this.receipts.sort((a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      for (let index = 0; index < this.receipts.length; index++) {
        this.receipts[index].originalValue = this.receipts[index].totalValue;
        this.receipts[index].totalValue = this.formatterPeso.format(this.receipts[index].totalValue);
        //this.receipts[index].createdAt = this.receipts[index].createdAt.split('T')[0];
        const dateObj = new Date(this.receipts[index].createdAt);
        dateObj.setHours(dateObj.getHours() + 5);
        this.receipts[index].createdAt = dateObj.toLocaleString();
        const dateObj2 = new Date(this.receipts[index].depositedAt);
        dateObj2.setHours(dateObj2.getHours() + 5);
        this.receipts[index].depositedAt = dateObj2.toLocaleString();
      }
    });
  }


  formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })

  gotoBack() {
    this.location.back();
  }

  selectAll(event: any) {
    this.updateFootable();
    const isChecked = event.target.checked;
    this.receipts.forEach(receipt => {
      receipt.selected = isChecked;
    });
    this.onSelectionChange();
  }

  onSelectionChange() {
    this.selectedReceipts = this.receipts.filter(receipt => receipt.selected);
  }

  isAllSelected() {
    return this.receipts.length > 0 && this.receipts.every(receipt => receipt.selected);
  }

  toggleStatus() {
    this.selectedReceipts.forEach(receipt => {
      this.recSrv.updateReceipts(receipt.id).subscribe((resp: any) => {
        if (resp) {
          Swal.fire('Bien hecho!', `Consignaciones realizadas correctamente`, 'success');
          this.getReceipts();
        }

      })
    });
  }

  getTotalSelected() {
    const total = this.selectedReceipts.reduce((total, receipt) => {
      return total + receipt.originalValue;
    }, 0);

    return this.formatterPeso.format(total);
  }

  updateFootable() {
    $(document).ready(() => {
      $('.footable').footable();
    });
  }


  imprimirRecibo(receipt: any) {
    Swal.fire({
      title: '¿Desea imprimir el recibo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#00afef',
      cancelButtonColor: '#ff4444',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(receipt);
        this.imprimir(receipt)

      }
    })
  }

  imprimir(receipt: any) {

    const numeroRecibo = receipt.number;
    const documento = receipt.customer.identificationNumber;
    const nombre = receipt.customer.name + ' ' + receipt.customer.lastName;
    var vlrtottemp = receipt.originalValue;
    var vlrtot = parseInt(vlrtottemp, 10);
    const totalPagado = this.formatterPeso.format(vlrtot);

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
        width: 170px;
        max-width: 170px;
    }

    .total {
        color: black;
        text-align: center;
        align-content: center;
    }
    .contenedor {
        display: flex;
        justify-content: center;
      }

      .contenedor img {
        width: 75%;
      }

      .centrado strong u {
        text-decoration: underline;
      }

        </style>
    </head>
    <body>
    <div class="ticket mx-n1">
        <div class="contenedor">
            <img src="assets/img/logos/LOGO DIBANET CIRCULO.png" alt="">
        </div>

        <p style="font-size: 10px !important; margin-bottom: -8px;" class="centrado">DIBRANET SAS
            <br>901.498.416-6
        </p>
        <div class="centrado">
            <p style="font-size: 10px !important;">VARIEDADES VANNE LA MERCED
                <br>CALLE 15 # 5-21
            </p>
        </div>
        <p class="centrado">
            Recibo No. ${numeroRecibo}
            <br>Fecha: ${fecha}
        </p>
            <p class="centrado">
                <strong><u>CLIENTE</u></strong>
                <br>CC: ${documento}
                <br>${nombre}
            </p>
        <div class="total" style="margin-top: -14px;">
            <p class="centrado"></p>
            <strong><u>VALOR: <strong style="font-size: 17px !important;">${totalPagado}</strong></u></strong>
            <p style="font-size: 10px !important; margin-top: -3px;">Mensualidad del servicio de Internet</p>
        </div>
        <p class="centrado" style="font-size: 11px !important;">
            314 5052260 - 312 2193348
            <br>facturacion.dibranet@gmail.com
        </p>
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

  exportTableToExcel(): void {
    const table = document.getElementById('tableReceipts');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    
    // Guardar el archivo
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'tabla_exportada.xlsx');
  }

  exportTableToExcel2(): void {
    const table = document.getElementById('tableReceipts');
    
    const receiptsForExport = this.receipts.map(receipt => ({
      ...receipt,
      consignado: receipt.isDeposited ? 1 : 0,
      identificationNumber: receipt.customer?.identificationNumber || '',
      name: receipt.customer?.name || '',
      lastName: receipt.customer?.lastName || '',
      phone: receipt.customer?.phone || ''
    }));
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(receiptsForExport, {
      header: ["number", "totalValue", "createdAt", "identificationNumber", "name", "lastName","phone"]
    });
  
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'tabla_exportada.xlsx');
  }
  
}
