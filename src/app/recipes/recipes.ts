import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-recipes',
  imports: [Header, Footer],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {

  api = inject(ApiService)
  allRecipes:any = signal([])
  cuisineArray:any = signal([])

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipesAPI().subscribe((res)=>{
      // console.log(res);
      this.allRecipes.set(res)
      // console.log(this.allRecipes());  

      const dummyCuisineArray = res.map((item:any)=>item.cuisine)
      dummyCuisineArray.forEach((cuisine:any)=>{
        !this.cuisineArray().includes(cuisine) && this.cuisineArray().push(cuisine)
      })
      console.log(this.cuisineArray());
        
      
    })
  }
}
