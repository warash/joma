import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';


export const routes: Routes = [
  {path: 'home/:type', component: HomeComponent},
  {path: 'admin', component: AdminComponent},
  {path: '**', redirectTo: "home/all"}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
