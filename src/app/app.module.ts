import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './home/product-list/product-list.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routing } from './app.routes';
import { ProductListStore } from './home/product-list.store';
import { ProductItemComponent } from './home/product-item/product-item.component';
import { AdminComponent } from './admin/admin.component';

const firebaseConfig = {
  apiKey: "AIzaSyDqHR5w70akx2NI6X5_2MY48pDPsVonsAA",
  authDomain: "joma-76031.firebaseapp.com",
  databaseURL: "https://joma-76031.firebaseio.com",
  storageBucket: "joma-76031.appspot.com",
  messagingSenderId: "770459318394"
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    ProductItemComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    CommonModule,
    RouterModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [ProductListStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
