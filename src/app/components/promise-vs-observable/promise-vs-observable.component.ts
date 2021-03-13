import { Component, OnDestroy, OnInit } from '@angular/core';
import { defer, of, Subscription, timer } from 'rxjs';
import { Observable } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-promise-vs-observable',
  templateUrl: './promise-vs-observable.component.html',
  styleUrls: ['./promise-vs-observable.component.css']
})
export class PromiseVsObservableComponent implements OnInit, OnDestroy {
  timerUnsubsribeStatus: any;
  _everySecond: any;
  _everySecond2: any;
  _everySecond3: any;
  everySecond: Observable<number> = timer(0,1000);
  everySecond2: Observable<number> = timer(1000,2000);
  everySecond3: Observable<number> = timer(2000,3000);
  timerSubscription: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {}

  ngOnDestroy() {}

  startTimer() {
    this.timerSubscription.add(this.everySecond.subscribe((second1) => {
      this._everySecond = second1;
      console.log(second1);
    }));
    this.timerSubscription.add(this.everySecond2.subscribe((second2) => {
      this._everySecond2 = second2;
      console.log(second2)
    }));
    this.timerSubscription.add(this.everySecond3.subscribe((second3) => {
      this._everySecond3 = second3;
      console.log(second3)
    }));
  }

  unsubscribeTimer() {
    this.timerSubscription.unsubscribe();
    console.log('Timer has been unsubscribed');
    this.timerUnsubsribeStatus = 'Timer has been unsubscribed.';
  }

  handlePromise() {
    const welcomePromise = new Promise((resolve) => {
      console.log('In promise executor fn');
      resolve('Welcome Promise');
      resolve('Welcome Promise2');
    });
    console.log("Before calling the then method");
    welcomePromise.then(console.log);
    if (`\`` !== '`') {
      console.log('backtick is true');
    } else {
      console.log('check backtick comparison logic');
    }
  }

  handleObservable() {
    const welcomeObservable = new Observable((respond) => {
      console.log("In Observable producer fn");
      respond.next('Welcome Observable');
      respond.next('Welcome Observable2');
      // respond.error('Error');
      respond.complete();
      // console.log("Before calling the subscribe method");
      // welcomeObservable.subscribe(console.log);
    });
    console.log('==========');
    console.log("Before calling the subscribe method");
    welcomeObservable.subscribe(console.log);
  }

  convertPromiseToObservable() {
    const welcomePromise2 = new Promise((resolve) => {
      console.log("In Promise executor fn");
      resolve('Welcome Promise 2');
    });
    return welcomePromise2;
  }

  getConvertPromiseToObservable() {
    const wrappedPromise2 = defer(() => this.convertPromiseToObservable());
    console.log("Before calling the subscribe method");
    wrappedPromise2.subscribe(console.log);
    console.log('Observable ends')
  }

  handleSwitchMap() {
    const newsProducer = (typeOfNews: string) => of(`News for ${typeOfNews}`).pipe(delay(1000));
    // ${expression/variable} => embed variables and expressions within the strings
    const query = of('politics', 'sports', 'economy');
    const news = query.pipe(switchMap(newsProducer)); // emitting values only from the most recently projected Observable
    news.subscribe(console.log);
  }

  handleSwitchMap2() {
    let number: any;
    for (number = 1; number <= 10; number++) {
      let number2 = of(number).pipe(switchMap((x: number) => of(x * 5)));
      number2.subscribe((next) => {
        console.log('resultOfSwitchedMap: ', next);
      }, (error) => {
        console.log('error: ', error);
      });
    }
  }

  handleTemplateLiteral() {
    const string1 = 'Hello, everyone\n' +
      'I love to code\n' +
      'in Javascript.';
    const string2 = `Hello, everyone
    I love to code
    in Javascript`;
    console.log('string1: ', string1);
    console.log('string2: ', string2);
    let color1 = 'purple';
    const intro1 = 'Hello, My favourite color is ' + color1 + '.';
    const intro2 = `Hello, My favourite color is ${color1}`;
    console.log('intro1: ', intro1);
    console.log('intro2: ', intro2);
    let color2 = 'yellow';
    let selection = color2 == 'green' ? color2 : color1;
    const sentence = `MY favourite color is ${selection}`;
    console.log('sentence: ', sentence);
  }

}
