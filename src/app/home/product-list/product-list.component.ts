import { Component, OnInit, Input } from '@angular/core';
import { ProductListStore } from '../product-list.store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent{

  @Input() products = [];



}
