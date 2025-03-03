import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public year = new Date().getFullYear();
  public formSubmitted: Boolean = false;
  public btnLoading: Boolean = false;

  public loginForm = this.fb.group({
    User: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSrv: AuthService

  ) { }

  ngOnInit(): void {
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.btnLoading = true;
    console.log(this.loginForm.value);
    
    this.authSrv.login(this.loginForm.value).subscribe((resp: any) => {
      this.authSrv.logInService(resp.authToken, this.loginForm.value.User);
      this.router.navigateByUrl('/home');
      this.btnLoading = false;

    }, (err) => {
      //En caso de un error
      Swal.fire('Error', 'Error al iniciar sesion', 'error');
      this.btnLoading = false;
    })

  }

  /**
* Método para validar los campos del form
* @param campo => Valor del campo
*/
public campoNoValido = (campo: any): boolean => {
  if (this.loginForm.get(campo)?.invalid && this.formSubmitted) {
    return true;
  } else {
    return false;
  }
}

}
