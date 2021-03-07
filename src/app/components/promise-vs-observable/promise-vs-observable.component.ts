import { Component, OnInit } from '@angular/core';
import { defer, of } from 'rxjs';
import { Observable } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-promise-vs-observable',
  templateUrl: './promise-vs-observable.component.html',
  styleUrls: ['./promise-vs-observable.component.css']
})
export class PromiseVsObservableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let number: any;
    for(number = 1; number <= 10; number++) {
      let number2 = of(number).pipe(switchMap((x: number) => of(x * 5)));
      number2.subscribe((next) => {
        console.log('resultOfSwitchedMap: ', next);
      }, (error) => {
        console.log('error: ', error);
      });
    }
  }

  handlePromise() {
    const welcomePromise = new Promise((resolve) => {
      console.log('In promise executor fn');
      resolve('Welcome Promise');
      resolve('Welcome Promise2');
    });
    console.log("Before calling the then method");
    welcomePromise.then(console.log);
    if (`\`` === '`') {
      console.log('backtick is true');
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
