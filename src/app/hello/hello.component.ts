import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/combineLatest';

@Component({
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
})
export class HelloComponent implements OnInit, OnDestroy {
  @select('message') message$: Observable<string>;
  @select() x$: Observable<number>;
  @select() y$: Observable<number>;
  xy: number;
  xySub: Subscription;

  ngOnInit() {
    this.xySub = this.x$.combineLatest(this.y$, (x, y) => {
      return x + y;
    }).subscribe(result => this.xy = result);


  }
  ngOnDestroy() {
    this.xySub.unsubscribe();
  }

}
