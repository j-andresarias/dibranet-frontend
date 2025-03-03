import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Location } from '@angular/common';
import { ReceiptsService } from 'src/app/services/receipts.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
declare var $: any;


@Component({
  selector: 'app-registro-consignaciones',
  templateUrl: './registro-consignaciones.component.html',
  styleUrls: ['./registro-consignaciones.component.css']
})
export class RegistroConsignacionesComponent {

  public receipts: Array<any> = [];
  public selectedReceipts: any[] = [];

  constructor(
    private location: Location,
    private recSrv: ReceiptsService
  ) { }
  ngOnInit(): void {
    $(document).ready(() => {
      $('.footable').footable();
    });
    this.getReceipts();
  }

  public getReceipts = () => {
    this.recSrv.getReceipts(false).subscribe((resp: any) => {
      this.receipts = resp.receipts;
      for (let index = 0; index < this.receipts.length; index++) {
        this.receipts[index].originalValue = this.receipts[index].totalValue;
        this.receipts[index].totalValue = this.formatterPeso.format(this.receipts[index].totalValue);
        this.receipts[index].createdAt = this.receipts[index].createdAt.split('T')[0]
      }
    })
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
    this.activeSpinner();
  
    const requests = this.selectedReceipts.map(receipt => 
      this.recSrv.updateReceipts(receipt.id)
    );
  
    forkJoin(requests).subscribe(
      (responses) => {
        this.getReceipts();
        this.activeSpinner();
        Swal.fire('Bien hecho!', 'Consignaciones realizadas correctamente', 'success');
      },
      (error) => {
        this.activeSpinner();
        Swal.fire('Error', 'Ocurrió un problema al realizar las consignaciones', 'error');
      }
    );
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

  /***
* Metodo para activar el spinner de carga mientras consume el servicio de actualizar el cliente
*/
  activeSpinner() {
    $(function () {
      $('#ibox').children('.ibox-content').toggleClass('sk-loading');
    })
  }

}
