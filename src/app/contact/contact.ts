import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ApiService } from '../services/api-service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  imports: [Header, Footer, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  api = inject(ApiService)
  name:string = ""
  email:string = ""
  message:string = ""

  submitFeedbackForm(form:NgForm){
    if(this.name && this.email && this.message){
      this.api.addFeedbackAPI({name:this.name,email:this.email,message:this.message}).subscribe((res:any)=>{
        Swal.fire({
  title: "Feedback Added!",
  text: "Thank you for your feedback!!! We appreciate your efforts to improve us....",
  icon: "success"
});
      form.resetForm()
      })
    }else{
      Swal.fire({
  title: "Incomplete Form!",
  text: "Please fill the form completely!",
  icon: "info"
});
    }
  }
}
