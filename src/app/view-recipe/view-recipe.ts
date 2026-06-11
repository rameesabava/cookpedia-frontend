import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { AdminModuleRoutingModule } from "../admin-module/admin-module-routing-module";

@Component({
  selector: 'app-view-recipe',
  imports: [Header, Footer, AdminModuleRoutingModule],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {}
