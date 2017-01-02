import { Component, OnInit } from '@angular/core';
import { ProductListStore } from '../home/product-list.store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  products$;
  details;

  constructor(private productStore: ProductListStore) {
  }

  ngOnInit() {
    this.products$ = this.productStore.products$;
  }
  showDetails(product){
    this.details = product;
  }


  saveProduct(product){

    console.log(product);
  }
}
