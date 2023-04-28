import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ClientesService } from 'src/app/services/clientes.service';

declare var $: any;

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  public formSubmitted = false;

  public formCrearCliente = this.fb.group({
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
    estrato: new FormControl('')
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private custSrv: ClientesService
  ) { }

  ngOnInit(): void {
  }

  crearCliente() {
    this.formSubmitted = true;

    if (this.formCrearCliente.invalid) {
      return;
    }
    this.activeSpinner();
    this.custSrv.createCustomer(this.formCrearCliente.value).subscribe((resp: any) => {

      Swal.fire('Bien hecho!', `Usuario creado correctamente`, 'success');
      this.activeSpinner();
      this.gotoBack();
    }, (err) => {
      //En caso de un error
      Swal.fire('Error', JSON.stringify(err.error.errors), 'error');
      this.activeSpinner();
    })
  }

  /**
 * Metodo para ir atras en la pagina
 */
  gotoBack() {
    Swal.fire({
      title: 'Desea volver atras? La información del formulario se perdera',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      confirmButtonColor: '#00afef'
    }).then((result) => {
      if (result.isConfirmed) {
        this.location.back();
      }
    })

  }

  /**
* Método para validar los campos del form
* @param campo => Valor del campo
*/
  public campoNoValido = (campo: any): boolean => {
    if (this.formCrearCliente.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

    /***
 * Metodo para activar el spinner de carga mientras consume el servicio de crear el usuario
 */
    activeSpinner() {
      $(function () {
        $('#ibox').children('.ibox-content').toggleClass('sk-loading');
      })
    }
}
