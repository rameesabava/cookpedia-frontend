import { Component, inject } from '@angular/core';
import { Footer } from '../footer/footer';
import { ApiService } from '../services/api-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Footer, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  api = inject(ApiService)

  registerForm: FormGroup
  formBuilder = inject(FormBuilder)
  router = inject(Router)

  constructor() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email

      const password = this.registerForm.value.password
      this.api.registerAPI({username,email,password}).subscribe({
        next:(res:any)=>{
          alert("Hi user.. your registration completed successfully")
          this.registerForm.reset()
          this.router.navigateByUrl('/login')
        },
        error:(reason:any)=>{
          alert(reason.error)
          this.registerForm.reset()
        }
      })

    }else{
      alert("Invalid form... please fill the form with valid data")
    }
  }
}
