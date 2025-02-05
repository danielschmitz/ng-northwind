import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoryComponent } from './categories/create/create-category.component';


export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/create', component: CreateCategoryComponent },
];
