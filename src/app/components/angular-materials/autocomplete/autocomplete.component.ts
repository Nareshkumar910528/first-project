import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {IndividualDataService} from '../../../services/individual-data.service';
import {map, startWith} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import { ConnectionServiceModule } from 'ng-connection-service';
import {EncrDecrService} from 'src/app/services/encr-decr/encr-decr.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  _username: string[] = []
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  filteredOptions: Observable<string[]>
  //stringTransfer: string;
  @Input() fromNewConcatArray: string[] = [] //child component property for @Input() decorator
  @Output() username2 = new EventEmitter<string>()
  decoratorDiagramImage: any;
  encryptedValue: any;
  decryptedValue: any;
  labelValue: any;

  constructor(private individualDataService: IndividualDataService, private toastrService: ToastrService, private EncrDecr: EncrDecrService) { }

  ngOnInit(): void {
    this.getUsername();
    console.log('fromNewConcatArray: ', this.fromNewConcatArray);
    //this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
    // setTimeout(() => {
    //   this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
    // }, 200);
    this.isLoggedIn();
  }

  getUsername() {
    this.individualDataService.getUserInfo().subscribe((respond: any[]) => {
      this._username = respond.map(userName => userName.username).sort((a, b) => a.localeCompare(b));
      console.log('_username1: ', this._username);
    }, (err: any)=> {
      console.log('error: ', err);
    }, () => {
      this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
      console.log('API request is completed.')
    });
  }

  setEncryptGetDecrypt(labelValue: any) {
    this.encryptedValue = this.EncrDecr.encrypt('123456$#@$^@1ERF', labelValue);
    console.log('encryptedValue: ', this.encryptedValue);
    this.decryptedValue = this.EncrDecr.decrypt('123456$#@$^@1ERF', this.encryptedValue);
    console.log('decryptedValue: ', this.decryptedValue);
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this._username.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  sendDataToRxJSComponent(_string: string) {
    //this.stringTransfer = "Hello from Autocomplete Component...!!!";
    this.username2.emit(_string);
    console.log('username2: ', this.username2);
    this.labelValue = _string;
    console.log('labelValue: ', this.labelValue);
    this.setEncryptGetDecrypt(this.labelValue);
    this._username.push(this.labelValue);
    this._username.sort((a,b) => a.localeCompare(b));
    console.log('_usernamePushed: ', this._username);
  }

  showInputOutputDecoratorsDiagram() {
    this.decoratorDiagramImage = "/assets/Decorator_Diagram.png";
    console.log('Image is shown');
  }
  
  isLoggedIn() {
    const authToken = localStorage.getItem('authToken'); // get token from local storage
    console.log('authToken: ', authToken);
    const payload = atob(authToken.split('.')[1]); // decode payload of token
    console.log('payload: ', payload);
    const JSONParsedPayload = JSON.parse(payload); // convert payload into an Object
    console.log('JSONParsedPayload: ', JSONParsedPayload);
    const DateNow = Date.now();
    console.log('DateNow: ', DateNow);
    console.log('transformedDateToString: ', new Date(DateNow).toString())
    console.log('transformedDateToISOString: ', new Date(DateNow).toISOString());
    if (JSONParsedPayload.exp > Date.now() / 1000) {
      console.log('Valid token')
    } else if (JSONParsedPayload.exp < Date.now() / 1000) {
      console.log('Token has expired')
    }
    const validToken =  JSONParsedPayload.exp > Date.now() / 1000;
    return validToken; // check if token is expired
  }

}
