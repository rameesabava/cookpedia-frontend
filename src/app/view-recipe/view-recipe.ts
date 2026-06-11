import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { AdminModuleRoutingModule } from "../admin-module/admin-module-routing-module";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-view-recipe',
  imports: [Header, Footer, AdminModuleRoutingModule, AsyncPipe],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {
  api = inject(ApiService)
  route = inject(ActivatedRoute)
  recipeId = this.route.snapshot.params['id']
  recipe$ = this.api.viewRecipeAPI(this.recipeId)
  allRelatedRecipes:any = signal([])
  router = inject(Router)

  ngOnInit(){
    this.recipe$.subscribe((res:any)=>{
      // console.log(res.cuisine);

      // api call to related recipe
      this.getAllRelatedRecipes(res.name, res.cuisine)
    })
    
  }

  getAllRelatedRecipes(name:string,cuisine:string){
    this.api.getRelatedRecipesAPI(cuisine).subscribe((res:any)=>{
      // console.log(res);
      if(res.length>1){
        this.allRelatedRecipes.set(res.filter((item:any)=>item.name!=name))
      }else{
        this.allRelatedRecipes.set([])
      }
      console.log(this.allRelatedRecipes());
      
    })
  }

  viewRelatedRecipePage(id:string){
    this.recipe$ = this.api.viewRecipeAPI(id)
    this.router.navigateByUrl(`/recipes/${id}`)
  }
 
}
