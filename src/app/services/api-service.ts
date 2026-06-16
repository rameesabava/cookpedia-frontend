import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // to append token to request header
  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers}
  }

  // get request by view component when page open -- authorized request
  viewRecipeAPI(recipeId:string){
    return this.http.get<any>(`${this.server_url}/recipes/${recipeId}`, this.appendToken())
  }

  // get related recipes : req by view component when page loaded
  getRelatedRecipesAPI(cuisine:string){
    return this.http.get<any[]>(`${this.server_url}/recipes-related?cuisine=${cuisine}`, this.appendToken())
  }

  // download recipe : req by view component when download btn clicked
  downloadRecipeAPI(recipeId:string,recipe:any){
    return this.http.post(`${this.server_url}/recipes/${recipeId}/download`,recipe, this.appendToken())
  }

  // save recipe : req by view component when save recipe btn clicked
  saveRecipeAPI(recipeId:string,recipe:any){
    return this.http.post(`${this.server_url}/recipes/${recipeId}/save`,recipe, this.appendToken())
  }

  // get all saved recipe : req by save recipe component when page loads
  getAllSaveRecipeAPI(){
    return this.http.get<any[]>(`${this.server_url}/recipes-save`, this.appendToken())
  }

  // remove recipe from save collection : req by save recipe component when delete btn clicked
  removeRecipeFromSaveRecipesAPI(id:string){
    return this.http.delete(`${this.server_url}/recipes-save/${id}`, this.appendToken())
  }
  // get req by profile component when page loads
getUserDownloadListAPI(){
    return this.http.get<any[]>(`${this.server_url}/user-downloads`, this.appendToken())
  }

  // put req by profile component when picture edit
  updateUserProfileAPI(userId:string,reqBody:any){
    return this.http.put(`${this.server_url}/users/${userId}`, reqBody,this.appendToken())
  }

  // get all users : get req by admin users component when page opens
  getAllUsersListAPI(){
    return this.http.get<any[]>(`${this.server_url}/users`,this.appendToken())
  }

  // get all feedbacks : get req by admin feedbacks component when page opens
  getAllFeedbackListAPI(){
    return this.http.get<any[]>(`${this.server_url}/feedbacks`,this.appendToken())
  }

  // get all downloads : get req by admin download component when page opens
  getAllDownloadListAPI(){
    return this.http.get<any[]>(`${this.server_url}/downloads`,this.appendToken())
  }

  // put req by feedback component when approve or reject btn clicked
  updateFeedbackAPI(id:string, reqBody:any){
    return this.http.put(`${this.server_url}/feedbacks/${id}`,reqBody,this.appendToken())
  }
}
