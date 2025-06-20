import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule, RouterLink ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  #router = inject( Router );
  fb = inject( FormBuilder );
  #authService = inject( AuthService );

  isPosting = signal( false );

  registerForm : FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required  ]],
    fullName: ['', [ Validators.required  ]]
  });

  onSubmit() {
    if( this.registerForm.invalid ) {    
      //todo: recorrer con los errores del form
      toast.error('LLenar los campos necesarios')
      return;
    }

    const { email, password, fullName } =  this.registerForm.value;

    this.#authService.register( email, password, fullName ).subscribe( isAutheticated => {
      if( isAutheticated ) {
           return this.#router.navigateByUrl('/')
      }
      return;
    });
    
  }
}
