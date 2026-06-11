import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ApiService } from '../services/api-service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  imports: [Header, Footer, FormsModule, SearchPipe, NgxPaginationModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {

  api = inject(ApiService)
  
  allRecipes:any = signal([])
  cuisineArray:any = signal([])
  mealTypeArray:any = signal([])
  dummyAllRecipes:any = []
  searchKey:string = ""
  p: number = 1;
  router = inject(Router)

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
        
      const dummyMealTypeArray = res.map((item:any)=>item.mealType).flat(Infinity)
      dummyMealTypeArray.forEach((meal:any)=>{
        !this.mealTypeArray().includes(meal) && this.mealTypeArray().push(meal)
      })
      console.log(this.mealTypeArray());
    })
  }

  filterRecipe(key:string, value:string){
    this.allRecipes.set(this.dummyAllRecipes.filter((item:any)=>item[key]==value))
  }

  viewRecipe(recipeId:string){
    if(sessionStorage.getItem("token")){
      this.router.navigateByUrl(`/recipes/${recipeId}`)
    }else{
      alert("Please Login to access our Recipe Collection....")
      this.router.navigateByUrl('/login')
    }
  }
}
