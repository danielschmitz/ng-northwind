import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'auth/login', component: LoginComponent },
];
