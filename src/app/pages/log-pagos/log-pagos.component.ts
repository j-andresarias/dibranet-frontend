import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Location } from '@angular/common';
import { ReceiptsService } from 'src/app/services/receipts.service';

declare var $: any;

@Component({
  selector: 'app-log-pagos',
  templateUrl: './log-pagos.component.html',
  styleUrls: ['./log-pagos.component.css']
})
export class LogPagosComponent implements OnInit {
  public receipts: Array<any> = [];

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
    this.recSrv.getReceipts().subscribe((resp: any) => {
      this.receipts = resp.receipts;
      for (let index = 0; index < this.receipts.length; index++) {
        this.receipts[index].totalValue = this.formatterPeso.format(this.receipts[index].totalValue);
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

}
