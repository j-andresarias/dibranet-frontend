import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';

declare var $: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public clientes: Array<any> = [];
  public edit: Boolean = false;

  public updateUsuarioForm = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    usuario: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    documento: ['', [Validators.required, Validators.required]],
    estado: [false, [Validators.required]],
    idrol: ['', [Validators.required]],
    company_id: ['', [Validators.required]],
    password: ['', [Validators.required]],
    passwordconfirm: ['', [Validators.required, Validators.minLength(8)]],
    id_module: ['']
  });

  constructor(
    private clientesSrv: ClientesService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    $(document).ready(() => {
      $('.footable').footable();
    });
    this.getClientes();
  }

  public getClientes = () => {
    this.clientesSrv.getClientes().subscribe((resp: any) => {
      this.clientes = resp;
      console.log(this.clientes);
    })
  }

  /**
   * Método para navegar a crear roles
   */
  public btnCrearCliente = () => {
    this.router.navigateByUrl('home/crear-cliente');
  }

  /*
Metodo para actualizar los datos del cliente
*/
  editCliente(cliente: any) {
    $(document).ready(() => {
      $('.footable3').footable();
    });
    this.edit = true;
  }

}
