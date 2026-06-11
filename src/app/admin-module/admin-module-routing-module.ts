import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Downloads } from './downloads/downloads';
import { AllRecipes } from './all-recipes/all-recipes';
import { Feedbacks } from './feedbacks/feedbacks';
import { ManageRecipe } from './manage-recipe/manage-recipe';
import { Users } from './users/users';

const routes: Routes = [
  // http://localhost:4200/admin
  {
    path:'',component:Dashboard,title:"Admin-Dashboard"
  },
  {
    path:'downloads',component:Downloads,title:"Admin-Downloads"
  },
  {
    path:'recipes',component:AllRecipes,title:"Admin-Recipes"
  },
  {
    path:'feedbacks',component:Feedbacks,title:"Admin-Feedbacks"
  },
  {
    path:'recipes/add',component:ManageRecipe,title:"Admin-Add Recipe"
  },
  {
    path:'recipes/:id',component:ManageRecipe,title:"Admin-Update Recipe"
  },
  {
    path:'users',component:Users,title:"Admin-Users"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminModuleRoutingModule {}
