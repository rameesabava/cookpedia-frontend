import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Recipes } from './recipes/recipes';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { SaveRecipes } from './save-recipes/save-recipes';
import { ViewRecipe } from './view-recipe/view-recipe';
import { Pnf } from './pnf/pnf';

export const routes: Routes = [
    // lazy load module : http://localhost:4200/admin
    {
        path:'admin', loadChildren:()=>import('./admin-module/admin-module-module').then(module=>module.AdminModuleModule)
    },
    {
        path:'', component:Home, title:'Home'
    },
    {
        path:'recipes', component:Recipes, title:'Recipes'
    },
    {
        path:'about', component:About, title:'About'
    },
    {
        path:'contact', component:Contact, title:'Contact'
    },{
        path:'login', component:Login, title:'Login'
    },{
        path:'register', component:Register, title:'Register'
    },{
        path:'profile', component:Profile, title:'Profile'
    },
{
        path:'recipes/save', component:SaveRecipes, title:'Save Recipes'
    },
    {
        path:'recipes/:id', component:ViewRecipe, title:'View Recipe'
    },
    {
        path:'**', component:Pnf, title:'Page Not Found'
    }
];
