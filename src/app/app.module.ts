import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './home/product-list/product-list.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routing } from './app.routes';
import { ProductListStore } from './home/product-list.store';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    CommonModule,
    RouterModule,
    routing,
  ],
  providers: [ProductListStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
