import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public clientes: Array<any> = [];
  public edit: Boolean = false;
  public formSubmitted = false;
  public btnLoading = false;

  public updateCustomerForm = this.fb.group({
    id: [''],
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    tipoDoc: new FormControl('', Validators.required),
    documento: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    megas: new FormControl(''),
    modalidad: new FormControl(''),
    fechaCorte: new FormControl(''),
    fechaInstalacion: new FormControl(''),
    estado: new FormControl(''),
    estrato: new FormControl(''),
    telefono2: new FormControl(''),
    valorServicio: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('')
  });

  constructor(
    private custSrv: ClientesService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getClientes();
  }
  public getClientes = () => {
    this.custSrv.getCustomers().subscribe((resp: any) => {
      $(document).ready(() => {
        $('.footable').footable();
      });
      this.clientes = resp.customers.map((customer: any) => ({
        ...customer,
        instalationDate: customer.instalationDate ? customer.instalationDate.split('T')[0] : null,
        birthDate: customer.birthDate ? customer.birthDate.split('T')[0] : null,
      }));
    });
  };
  

  /**
   * Método para navegar a crear roles
   */
  public btnCrearCliente = () => {
    this.router.navigateByUrl('home/crear-cliente');
  }

  /*
Metodo para actualizar los datos del cliente
*/
  editCliente(customer: any) {
    $(document).ready(() => {
      $('.footable3').footable();
    });
    this.edit = true;
    this.updateCustomerForm = this.fb.group({
      userId: [customer._id],
      nombre: new FormControl(customer.name, [Validators.required, Validators.minLength(3)]),
      apellido: new FormControl(customer.lastName, [Validators.required]),
      tipoDoc: new FormControl(customer.identificationType, [Validators.required]),
      documento: new FormControl(customer.identificationNumber, [Validators.required]),
      direccion: new FormControl(customer.address, [Validators.required]),
      telefono: new FormControl(customer.phone, [Validators.required]),
      email: new FormControl(customer.email, [Validators.required, Validators.email]),
      megas: new FormControl( customer.megabytes),
      modalidad: new FormControl({ value: customer.modality, disabled: false }),
      fechaCorte: new FormControl({ value: customer.cutOfDate, disabled: false }),
      fechaInstalacion: new FormControl({ value: customer.instalationDate, disabled: true }),
      fechaNacimiento: new FormControl({ value: customer.birthDate, disabled: false }),
      estado: new FormControl(''),
      estrato: new FormControl({ value: customer.stratum, disabled: false }),
      valorServicio: new FormControl(customer.serviceCost, [Validators.required]),
      observacion: new FormControl({ value: customer.observation, disabled: false }),
      telefono2: new FormControl({ value: customer.phone2, disabled: false })
    });

  }

  actualizarCustomer() {
    this.formSubmitted = true;
    if (this.updateCustomerForm.invalid) {
      return;
    }
    this.activeSpinner();
    this.custSrv.updateCustomer(this.updateCustomerForm.value).subscribe((resp: any) => {
      Swal.fire('Bien hecho!', `Usuario actualizado correctamente`, 'success');
      this.activeSpinner();
      this.edit = false;
      setTimeout(() => { this.getClientes() }, 1000);
    }, (err) => {
      //En caso de un error
      Swal.fire('Error', err.error.errors[0].msg, 'error');
      this.activeSpinner();
    })
  }

  gotoBack() {
    this.edit = false;
  }

  gotoBack2() {
    this.location.back();
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
