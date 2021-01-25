import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

//use the service to handle the data that needs to be displayed on the frontend
export class IndividualDataService {
//demo data. data is the type of Student model

  constructor(private http: HttpClient) { }

  public getStudents(): any {
    return this.http.get('http://jsonplaceholder.typicode.com/users');
    //studentsObservable will return an Observable
    // const studentsObservable = new Observable(
    //   observer => {
    //     setTimeout(() => {
    //       observer.next(this.students)
    //       //observer.error(this.students)
    //       //observer.complete();
    //     }, 250);
    //     //after 1 second, it will produce the whole student’s array if the subscriber subscribes the observable
    //   });
    // return studentsObservable;
    // studentObservable are publishing our primary data array that is students.
    // So if any entity needs to get the values out of observable, then it first needs to subscribe that observable
    // and then studentObservable starts to publish the values, and then subscriber get the values.
  }
}
