import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-feedbacks',
  standalone: false,
  templateUrl: './feedbacks.html',
  styleUrl: './feedbacks.css',
})
export class Feedbacks {
  api = inject(ApiService)
  allFeedbacks:any = signal([])

  ngOnInit(){
    this.getAllFeedbacks()
  }

  getAllFeedbacks(){
  this.api.getAllFeedbackListAPI().subscribe((res:any)=>{
    this.allFeedbacks.set(res)
  })
  }

  updateFeedback(id:string,status:string){
    this.api.updateFeedbackAPI(id,{status}).subscribe((res:any)=>{
      this.getAllFeedbacks()
    })
  }
}
