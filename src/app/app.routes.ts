import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  {path: 'home/:type', component: HomeComponent},
  {path: '**', redirectTo: "home/all"}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
