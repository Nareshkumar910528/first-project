import { Component, OnInit } from '@angular/core';
import {Observable, of, timer, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, tap, } from 'rxjs/operators';
import { IndividualDataService } from 'src/app/services/individual-data.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {error} from '@angular/compiler/src/util';
import {isNewline} from 'codelyzer/angular/styles/cssLexer';

const fruitsObservable = of('apple', 'orange', 'grape');
// a constant observer object variable
const fruitObserver = {
  next: (x: string) => { console.log('Observer got a next value: ' + x)},
  error: (err: string) => { console.log('Observer got an error: ' + err)},
  complete: () => { console.log('Observer got a complete notification')}
}

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};
//const apiUrl = 'http://localhost:4200/api/v1/products';

//BehaviorSubject is a Subject that requires an initial value and emits its current value to new subscribers

@Component({
  selector: 'app-rxjs-proj',
  templateUrl: './rxjs-proj.component.html',
  styleUrls: ['./rxjs-proj.component.css']
})
export class RxjsProjComponent implements OnInit {
  userInfo:any;
  employeeInfo: any;
  mappedData: any;
  val: number;
  timerCompleteIndication: string = 'Execution is completed.';
  data: any[] = [];
  errorMessage: any;
  noOfData: any;
  completionStatus: any;
  constructor(private individualDataService: IndividualDataService, private http: HttpClient) {
    //adds a constructor that will execute the observable by subscribing to the above observer object
    fruitsObservable.subscribe(fruitObserver);
    // this.getProducts()
    //   .subscribe((res: any) => {
    //     this.data = res;
    //     console.log(this.data);
    //   }, err => {
    //     console.log(err);
    //   });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.individualDataService.getUserInfo().pipe(catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      return throwError(err);
    })).subscribe((respond: string | any[]) => { //success
      this.userInfo = respond;
      if(respond.length == 0) {
        this.noOfData = 'No Data';
      } else {
        this.noOfData = respond.length;
      }
      console.log('_student: ', this.userInfo);
    }, (err: { message: any; }) => { //error
      console.log('error: ', err);
      this.errorMessage = err.message;
      this.noOfData = 'No incoming data';
    }, () => { //complete
      this.completionStatus = 'HTTP request completed.';
      console.log('HTTP request completed.');
    })
  }

  getStreetListings() {
    this.individualDataService.getUserInfo().subscribe((respond) => {
      this.userInfo = respond;
      this.mappedData = this.userInfo.map(data => data.address.street + ', ' + data.address.geo.lat + ', ' + data.address.geo.lng);
      this.mappedData.push('Penang' + ', ' + '5.4141' + ', ' + '100.3288');
      this.mappedData.unshift('Kuala Lumpur' + ', ' + '3.1390' + ', ' + '101.6869');
      console.log('Street: ', this.mappedData);
    })
  }

  // getStudentData() {
  //   //const studentObservable = this.studentService.students;
  //   const studentObservable = this.studentService.getStudents();
  //   //have subscribed the observable and get the students data
  //   studentObservable.subscribe((studentData: Student[]) => {
  //     this.students = studentData;
  //   })
  // }

  // basicUsageModelOfObservable() {
  //   //dueTime: start after 1s. //period: internal between each value execution
  //   const source = timer(1000, 1000);
  //   const subscribe = source.subscribe(val  => {
  //     this.val = val + 1;
  //     console.log(val);
  //   });
  //   setTimeout(() => {subscribe.unsubscribe()}, 3000);
  //   setTimeout(() => this.getStudentData(), 3000)
  // }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // getProducts(): Observable<any[]> {
  //   return this.http.get<any[]>(apiUrl)
  //     .pipe(
  //       tap(product => console.log('fetched products')),
  //       catchError(this.handleError('getProducts', []))
  //     );
  // }
  //
  // getProduct(id: number): Observable<any> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.get<any>(url).pipe(
  //     tap(_ => console.log(`fetched product id=${id}`)),
  //     catchError(this.handleError<any>(`getProduct id=${id}`))
  //   );
  // }

  // testObservable() {
  //   let myObservable = new Observable();
  //   myObservable.subscribe(
  //     x => console.log('Observer got a next value: ' + x),
  //     err => console.log('Observer got an error: ' + err),
  //     () => console.log('Observer got a complete notification')
  //   )
  // }
}
