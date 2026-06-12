import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { AdminModuleRoutingModule } from "../admin-module/admin-module-routing-module";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api-service';
import { AsyncPipe } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


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

  downloadRecipe(){
    this.recipe$.subscribe((res:any)=>{
      this.addRecipe(res)
    })
  }

  addRecipe(recipe:any){
    this.api.downloadRecipeAPI(recipe._id,recipe).subscribe((res:any)=>{
      console.log(res);
      // download pdf
      this.generatePDF(recipe)
      
    })
  }

  generatePDF(recipe:any){
    let pdf = new jsPDF()
    let titleRow = [['Name','Cuisine','Ingredients','Instructions','Calories','Servings']]
    let contentRow = [[recipe.name, recipe.cuisine,recipe.ingredients,recipe.instructions,recipe.caloriesPerServing, recipe.servings]]
    autoTable(pdf,{head:titleRow,body:contentRow})
    pdf.save(`${recipe.name}.pdf`)
  }

  saveRecipe(){
    this.recipe$.subscribe((res:any)=>{
      this.addToSaveRecipe(res)
    })
  }

  addToSaveRecipe(recipe:any){
    this.api.saveRecipeAPI(recipe._id,recipe).subscribe({
      next:(res:any)=>{
        alert(`${recipe.name} added to your collection!!!`)
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }
 
}
