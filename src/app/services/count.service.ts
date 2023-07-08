import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountService {
  public readonly count$: Observable<number>;

  private _count$: BehaviorSubject<number>;

  constructor() {
    this._count$ = new BehaviorSubject<number>(0);
    this.count$ = from(this._count$);
  }

  public step() {
    this._count$.next(this._count$.value + 1);
  }

  public reset() {
    this._count$.next(0);
  }
}
