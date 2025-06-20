import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { toast } from 'ngx-sonner';

import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  #router = inject( Router );
  fb = inject( FormBuilder );
  #authService = inject( AuthService );

  isPosting = signal( false );

  loginForm : FormGroup = this.fb.group({
    email: ['test1@google.com', [ Validators.required ]],
    password: ['Abc123', [ Validators.required  ]]
  });

  onSubmit() {
    if( this.loginForm.invalid ) {    
      //todo: recorrer con los errores del form
      toast.error('Usuario o contraseña incorrectos')
      return;
    }

    const { email, password } =  this.loginForm.value;

    this.#authService.login( email, password ).subscribe( isAutheticated => {
      if( isAutheticated ) {
           return this.#router.navigateByUrl('/')
      }
      return;
    });
    
  }

}
