import { Http } from '@angular/http';
import { Subject, Observable, Subscription, BehaviorSubject, ReplaySubject } from 'rxjs';
import { curry, filter, partial } from 'lodash';
import { Injectable } from '@angular/core';
const initState = {
  type: 'all',
  products: [],
  busy: false
};

@Injectable()
export class ProductListStore {


  constructor(private http: Http) {

    this.updates$ = new ReplaySubject<any>();

    this.state$ = this.updates$
      .scan((state, updateFunction) => {
        return updateFunction(state)
      }, initState).do(s => console.log(s))
      .publishReplay(1).refCount();


    this.products$ = this.state$.map(s => {
      return filter(s.products, {type: s.type});
    });


    this.filterByType$ = new Subject<string>();

    this.filterByType$.map((filter) => partial(this.onFilterChanged, filter))
      .subscribe(this.updates$);


    this.http.get('/assets/data/products.json')
      .map(r => r.json()).publishReplay(1).refCount()
      .map(products => partial(this.onProductLoaded, products))
      .startWith(this.setBusy)
      .subscribe(update => {
        this.updates$.next(update)
      });
  }


  //reducers
  private setBusy(state) {
    state.busy = true;
    return state;
  }

  private onProductLoaded(products, state) {
    state.products = products;
    state.busy = false;
    return state;
  }

  private onFilterChanged(type, state) {
    state.type = type;
    return state;
  }

  //state
  private updates$: Subject<any>;
  state$: Observable<any>;
  products$: Observable<any>;

  //intents
  filterByType$: Subject<any>;


}
