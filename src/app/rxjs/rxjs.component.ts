import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare let jQuery: any;

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit, AfterViewInit {
  @ViewChild('inputBox') inputBox: ElementRef;
  keyUps$: Observable<any>;
  
  $drag;
  $dropArea;
  $doc;

  drop$: Observable<any>;
  beginDrag$: Observable<any>;
  endDrag$: Observable<any>;
  mouseMove$: Observable<any>;
  // currentOverArea$: Observable<any>;
  currentOverArea$;
  

  interval$: Observable<any>;
  of$: Observable<any>;
  from$: Observable<any>;
  range$: Observable<any>;
  published$: Observable<any>;
  merged$: Observable<any>;
  concated$: Observable<any>;

  constructor() { }

  ngOnInit() {
    // this.createInterval();
    // this.createOfFrom();
    // this.createRange();
    // this.createPublished();
    // this.createMerged();
    // this.createConcated();
  }

  ngAfterViewInit() {
    this.setUpKeyupEvent();
    this.setUpDragEvent();
  }

  setUpKeyupEvent() {
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

  setUpDragEvent() {
    this.$drag = jQuery('#drag');
    this.$dropArea = jQuery('.drop-area');
    this.$doc = jQuery(document);
    // console.log('$doc', this.$doc);
    this.beginDrag$ = Observable.fromEvent(this.$drag, 'mousedown');
    this.endDrag$ = Observable.fromEvent(this.$doc, 'mouseup')
    this.mouseMove$ = Observable.fromEvent(this.$doc, 'mousemove');

    this.drop$ = this.beginDrag$
      .do(e => {
        e.preventDefault();
        this.$drag.addClass('dragging');
      })
      .mergeMap(startEvent => {
        return this.mouseMove$
          .takeUntil(this.endDrag$)
          .do(moveEvent => {
            this.moveDrag(startEvent, moveEvent);
          })
          //no data will be sent to drop$.subscribe until endDrag$ event fires
          .last()
          .do((x) => {
            // console.log('return to original spot', x);
            this.$drag.removeClass('dragging')
              .stop()
              .animate({
                'top': 0,
                'left': 0
              }, 500);
          })
          .withLatestFrom(this.currentOverArea$, (event, $area) => $area)
      })
      
   
      this.drop$.subscribe($area => {
        console.log($area);
        this.$dropArea.removeClass('dropped');
        if ($area) {
          $area.addClass('dropped');
        }
      })

    this.currentOverArea$ = Observable.merge(
      Observable.fromEvent(this.$dropArea, 'mouseenter')
        .map((e: any) => jQuery(e.target)),
      Observable.fromEvent(this.$dropArea, 'mouseleave')
        .map((e: any) => null)
    ); 
  }
    
  moveDrag(startEvent, moveEvent) {
    // console.log(moveEvent);
    this.$drag.css({
      left: moveEvent.clientX - startEvent.offsetX,
      top: moveEvent.clientY - startEvent.offsetY
    });
  }

  createRange() {
    this.range$ = Observable.range(5, 55)
      .startWith(-5)
      .filter(num => num % 5 === 0)
      .map(num => { 
        let divided = num / 5;
        return `${num} / 5 = ${divided}`;
      });

    this.range$.subscribe(num => console.log(num));
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

  createPublished() {
    this.published$ = Observable.interval(1000)
      .skip(1)
      .publishReplay(2).refCount()
      .take(15)
      .finally(() => console.log('All done here!'));

    let sub1 = this.published$.subscribe(num => {
      console.log('Started publishing', num);  
      setTimeout(() => {
        sub1.unsubscribe();
      }, 5000); 
    });

    setTimeout(() => {
      this.published$.subscribe(num => {
        console.log('Delayed 5 seconds', num);

        setTimeout(() => {
          sub1.unsubscribe();
        }, 3000) 
      });
    }, 5000);
  }

  createMerged() {
    // this.merged$ = Observable.interval(1000)
    //   .take(10)
    //   .merge(Observable.of(['A', 'B', 'C', 'D', 'E']))
    //   .merge(Observable.from(['A', 'B', 'C', 'D', 'E']));

    //7 total
    this.merged$ = Observable.merge(
      Observable.interval(1000).map(i => `${i} seconds`),
      Observable.interval(500).map(i => `${i} half seconds`)
    )
    .take(7)
    .finally(() => console.log('All done here!'));
      
    this.merged$.subscribe(data => console.log(data));
  }

  createConcated() {
    this.concated$ = Observable.concat(
      Observable.interval(1000).map(i => `${i} seconds`).take(3),
      Observable.interval(500).map(i => `${i} half seconds`).take(3)
    );

    this.concated$.subscribe(data => console.log(data));
  }


}
