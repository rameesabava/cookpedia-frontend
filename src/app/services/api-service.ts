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
}
