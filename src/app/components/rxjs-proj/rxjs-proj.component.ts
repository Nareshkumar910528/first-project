import {Component, Input, OnInit} from '@angular/core';
import {Observable, of, timer, throwError, BehaviorSubject } from 'rxjs';
import {map, catchError, tap, filter,} from 'rxjs/operators';
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
  userInfo2:any;
  employeeInfo: any;
  mappedData: any;
  slicedMappedData: any;
  joinedStingOfMappedData: any;
  concatNewArrayWithMappedData: any;
  val: number;
  timerCompleteIndication: string = 'Execution is completed.';
  data: any[] = [];
  errorMessage: any;
  noOfData: any;
  completionStatus: any;
  public spreadArray: any[];
  public newConcatArray: string[] = []; //parent component property for @Input() decorator
  fromUsername: any;
  sortedMappedData: any;

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
      this.getStreetListings();
  }

  getDataFromAutocomplete(_string: string) {
    this.fromUsername = _string;
    console.log('fromUsername: ', this.fromUsername);
    this.newConcatArray.push(this.fromUsername);
    this.newConcatArray.sort((a,b) => a.localeCompare(b));
    console.log('newConcatArray: ', this.newConcatArray);
  }

  getUserData() {
    this.individualDataService.getUserInfo().pipe(catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      return throwError(err);
    })).subscribe((respond: string | any[]) => { //success
      this.userInfo = respond;
      this.userInfo.sort((name1, name2) => name1.name.localeCompare(name2.name));
      if(respond.length == 0) {
        this.noOfData = 'No Data';
      } else {
        this.noOfData = respond.length;
      }
      console.log('userInfo: ', this.userInfo);
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
      this.userInfo2 = respond;
      // this.mappedData = this.userInfo2.map(data => data.address.street + ', ' + data.address.geo.lat + ', ' + data.address.geo.lng);
      this.mappedData = this.userInfo2.map(data => data.address.street);
      console.log('Street: ', this.mappedData);
      this.mappedData.push('Penang'); //add an element to the end of an array
      console.log('pushedMappedData: ', this.mappedData);
      this.mappedData.pop(); //removes the last element of an array
      console.log('poppedMappedData: ', this.mappedData);
      this.mappedData.unshift('Kuala Lumpur'); //adds an element to the beginning of an array
      console.log('unshiftedMappedData: ', this.mappedData);
      this.mappedData.shift(); //removes the first element of an array
      console.log('shiftedMappedData: ', this.mappedData);
      this.slicedMappedData = this.mappedData.slice(1,8); //selects the elements starting at the given start argument and the end at argument, but it does not include the given end argument
      console.log('slicedMappedData: ', this.slicedMappedData);
      this.mappedData.splice(4,2,'Penang','India'); //add and remove elements from an array
      console.log('splicedMappedData: ', this.mappedData);
      console.log('indexedOfMappedData: ', this.mappedData.indexOf("Ellsworth Summit")); //searches an array for an element value and returns its position
      this.joinedStingOfMappedData = this.mappedData.join(' == '); //convert an array to a string
      console.log('joinedStringOfMappedData: ', this.joinedStingOfMappedData); //specify the separator
      console.log('toStringOfMappedData: ', this.mappedData.toString()); //convert an array to a string
      let newArray = ['Kuala Lumpur', 'Selangor', 'Singapore'];
      this.concatNewArrayWithMappedData = this.mappedData.concat(newArray); //merge arrays together. It returns a new array by concatenating existing arrays
      console.log('concatNewArrayWithMappedData: ', this.concatNewArrayWithMappedData);
      console.log('includesChecking: ', this.concatNewArrayWithMappedData.includes('Pahang')); //checks if an element is available within an array. Will return true or false
      if (this.concatNewArrayWithMappedData.includes('Penang')) { //checks if an element is available within an array
        console.log('exist')
      } else {
        console.log('not exist')
      }
      const findMappedData =  this.concatNewArrayWithMappedData.find(streetName => streetName == 'Singapore'); //returns the value of the first array element that passes a test function
      console.log('findMappedData: ', findMappedData);
      const findIndexMappedData = this.concatNewArrayWithMappedData.findIndex(streetName => streetName == 'Hoeger Mall'); //returns the index of the first array element that passes a test function instead of returning the value
      console.log('findIndexMappedData: ', findIndexMappedData);
      this.concatNewArrayWithMappedData.forEach(streetName => { //iterate over an array’s items
        if (streetName === 'Penang') {
          console.log('forEachMappedData: Penang is my hometown');
        } else if (streetName === 'Selangor') {
          console.log('forEachMappedData: Selangor is my second hometown');
        } else if (streetName === 'Kuala Lumpur') {
          console.log('forEachMappedData: Kuala Lumpur is the capital of Malaysia');
        }
      });
      const filteredMappedData = this.concatNewArrayWithMappedData.filter(streetName => streetName !== 'Kattie Turnpike'); //filters the array, based on the function passed to it
      console.log('filteredMappedData: ', filteredMappedData);
      this.sortedMappedData = filteredMappedData.sort((a,b) => a.localeCompare(b)); //sorts the items of an array
      console.log('sortedMappedData: ', this.sortedMappedData);
      const newArray2: Array<any> = ["Malaysia", "Sri Lanka", "United States of America"];
      this.spreadArray = [...newArray2, this.sortedMappedData];
      console.log('spreadArray: ', this.spreadArray);
      this.newConcatArray = this.sortedMappedData.concat(newArray2).sort((a,b) => a.localeCompare(b));
      console.log('newConcatArray: ',this.newConcatArray);
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
