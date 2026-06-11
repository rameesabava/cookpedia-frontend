import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  server_url = "http://localhost:3000"
  http = inject(HttpClient)

  // get all recipes - home and recipes component
  getAllRecipesAPI(){
    return this.http.get<any[]>(`${this.server_url}/recipes`)
  }

  // post req by contact component when send btn clicked
  addFeedbackAPI(reqBody:any){
    return this.http.post(`${this.server_url}/feedbacks`,reqBody)
  }

  // get req by home component when page loads
  getAllApprovedFeedbacksAPI(){
    return this.http.get<any[]>(`${this.server_url}/feedbacks/approved`)
  }

  // post req by register component when register btn clicked
  registerAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)
  }

  // post req by login component when login btn clicked
  loginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
  }
}
