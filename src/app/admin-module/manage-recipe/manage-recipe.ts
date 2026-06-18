import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { ActivatedRoute } from '@angular/router';
import { RecipeModel } from '../models/recipeModel';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.html',
  styleUrl: './manage-recipe.css',
})
export class ManageRecipe {
  api = inject(ApiService)
  route = inject(ActivatedRoute)
  recipeId = this.route.snapshot.params['id']
  recipeDetails = signal<RecipeModel>({})
  ingredientArray: any = []
  instructionArray: any = []
  MealTypeArray: any = []

  ngOnInit(){
    if(this.recipeId){
      this.api.viewRecipeAPI(this.recipeId).subscribe((res:any)=>{
        this.recipeDetails.set(res)
        this.ingredientArray = this.recipeDetails().ingredients
        this.instructionArray = this.recipeDetails().instructions
        this.MealTypeArray = this.recipeDetails().mealType
      })
    }
  }

  addIngredient(ingredientInput:HTMLTextAreaElement){
    if(ingredientInput.value){
      this.ingredientArray.push(ingredientInput.value)
      ingredientInput.value = ""
    }
  }
  removeIngredient(value:string){
    this.ingredientArray = this.ingredientArray.filter((item:string)=>item!=value)
  }

   addInstruction(instructionInput:HTMLTextAreaElement){
    if(instructionInput.value){
      this.instructionArray.push(instructionInput.value)
      instructionInput.value = ""
    }
  }
  removeInstruction(value:string){
    this.instructionArray = this.instructionArray.filter((item:string)=>item!=value)
  }

   addMealType(mealInput:HTMLTextAreaElement){
    if(mealInput.value){
      this.MealTypeArray.push(mealInput.value)
      mealInput.value = ""
    }
  }
  removeMealType(value:string){
    this.MealTypeArray = this.MealTypeArray.filter((item:string)=>item!=value)
  }

  addRecipe(){
    this.recipeDetails().ingredients = this.ingredientArray
    this.recipeDetails().instructions = this.instructionArray
    this.recipeDetails().mealType = this.MealTypeArray
  const {name, ingredients, instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails()
  if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty &&cuisine && caloriesPerServing && image && mealType!.length>0){
    this.api.addRecipeAPI(this.recipeDetails()).subscribe({
      next:(res:any)=>{
        alert("Recipe added successfully!!")
        this.recipeDetails.set({})
        this.instructionArray = []
        this.ingredientArray = []
        this.MealTypeArray = []
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }else{
    alert("Fill the form completely")
  }
  }

  editRecipe(){
    this.recipeDetails().ingredients = this.ingredientArray
    this.recipeDetails().instructions = this.instructionArray
    this.recipeDetails().mealType = this.MealTypeArray
  const {name, ingredients, instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails()
  if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty &&cuisine && caloriesPerServing && image && mealType!.length>0){
    this.api.editRecipeAPI(this.recipeId,this.recipeDetails()).subscribe((res:any)=>{
      alert("Recipe updated successfully!!")
      })
  }else{
    alert("Fill the form completely")
  }
  }
}
