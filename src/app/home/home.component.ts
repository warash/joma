import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  '../rx-operators'
import { ProductListStore } from './product-list.store';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  products$;
  busy$;

  constructor(private route: ActivatedRoute,
              private prodStore: ProductListStore) {
  }

  ngOnInit() {
    this.products$ = this.prodStore.products$;
    this.busy$ = this.prodStore.state$.map(s => s.busy);


    this.route.params.map(p => p['type']).subscribe(x=>{
      this.prodStore.filterByType$.next(x)
    });
  }
}
