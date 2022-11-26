import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  public formCrearCliente = this.fb.group({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    tipoDoc: new FormControl('', Validators.required),
    documento: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    correo: new FormControl(''),
    megas: new FormControl(''),
    modalidad: new FormControl(''),
    fechaCorte: new FormControl(''),
    fechaInstalacion: new FormControl(''),
    estado: new FormControl(''),
    estrato: new FormControl('')
  });

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  crearCliente() {
    console.log(this.formCrearCliente.value);
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
}
