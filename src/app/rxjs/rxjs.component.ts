import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { createSubscriber } from '../shared/helper-functions';



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit, AfterViewInit {
  @ViewChild('inputBox') inputBox: ElementRef;
  keyUps$: Observable<any>;
  interval$: Observable<any>;
  of$: Observable<any>;
  from$: Observable<any>;

  constructor() { }

  ngOnInit() {
    // this.createInterval();
    this.createOfFrom();
  }

  ngAfterViewInit() {
    this.keyUps$ = Observable.fromEvent(this.inputBox.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      // .do(value => console.log(value))
      .distinctUntilChanged()
      .debounceTime(300)
      .switchMap(this.getItems);

    this.keyUps$.subscribe(results => {
      console.log(results);
      
    }, err => console.log(err)
      , () => console.log('complete') 
    )
  }

  createInterval() {
    this.interval$ = Observable.interval(1000)
      .skip(1)
      .take(10)
      .map(time => {
        if(time === 10) return 'Party is over!';
        return `${time}:00 on Thursday`
      });


    this.interval$.subscribe(time => {
      console.log(time);
    });
  }

  createOfFrom() {
    this.of$ = Observable.of(['Hello', 'from', 'BKK', 'of$']);
    this.from$ = Observable.from(['Hello', 'from', 'Tokyo', 'from$']);
    //outputs a single value []
    this.of$.subscribe(greeting => console.log(greeting));
    //outputs each value
    this.from$.subscribe(greeting => console.log(greeting));  
  }

  getItems(title) {
    console.log('querying', title);
    let items = [];

    for(let i = 0; i < 21; i++) {
      items.push(i);
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({title, items})
      }, 3000);
    });   
  }


}
