import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-module-routing-module';
import { Dashboard } from './dashboard/dashboard';
import { Feedbacks } from './feedbacks/feedbacks';
import { Downloads } from './downloads/downloads';
import { ManageRecipe } from './manage-recipe/manage-recipe';
import { Sidebar } from './sidebar/sidebar';
import { Users } from './users/users';
import { AllRecipes } from './all-recipes/all-recipes';

@NgModule({
  declarations: [Dashboard, Feedbacks, Downloads, ManageRecipe, Sidebar, Users, AllRecipes],
  imports: [CommonModule, AdminModuleRoutingModule],
})
export class AdminModuleModule {}
