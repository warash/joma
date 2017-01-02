import { Subject, Observable, ReplaySubject } from 'rxjs';
import { curry, filter } from 'lodash';
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { assign } from 'lodash';


export class BaseStore {

  protected updates$: Subject<any>;
  state$: Observable<any>;

  constructor() {

    this.updates$ = new Subject<any>();

    this.state$ = this.updates$
      .scan((state, modifier) => modifier(state), initState)
      .do(s => console.info("current state:", s))
      .publishReplay(1).refCount();

    this.state$.subscribe();
  }
}


export declare function reaction<T>(this: Observable<T>, success: Function, init?: Function, err?: Function): Observable<any>;
export declare function pour<T>(this: Observable<T>, dest: Subject<any>): any;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    reaction: typeof reaction;
    pour: typeof pour;
  }
}


Observable.prototype.reaction = function (success, init, err) {
  let ret = this.map(x => curry(success)(x));
  if (init) {
    ret = ret.startWith(init)
  }
  if (err) {
    ret.catch(e => Observable.of(err))
  }
  return ret;
};
Observable.prototype.pour = function (dest: Subject<any>) {
  return this.subscribe(result => dest.next(result))
};


const initState = {
  type: 'all',
  products: [],
  busy: false
};


@Injectable()
export class ProductListStore extends BaseStore {

  constructor(private af: AngularFire) {
    super();

    this.af.database.list('/products')
      .reaction(this.onProductLoaded, this.onSetBusy)
      .pour(this.updates$);
  }

  //mutations
  private onSetBusy(state) {
    console.log('busy');
    return assign(state, {busy: true});
  }

  private onProductLoaded(products, state) {
    console.log('loaded');
    return assign(state, {products, busy: false});
  }

  private onFilterChanged(type, state) {
    console.log('filter');
    return assign(state, {type});
  }

  //selectors
  products$ = this.state$.map(s => {
    if (s.type === 'all') return s.products;
    return filter(s.products, {type: s.type});
  });

  //actions
  filterByType$ = new Subject<string>();

  //reactions
  private filterOnClient = this.filterByType$
    .reaction(this.onFilterChanged).pour(this.updates$);
}
