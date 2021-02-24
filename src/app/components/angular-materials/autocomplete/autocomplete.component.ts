import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {IndividualDataService} from '../../../services/individual-data.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  _username: string[] = [];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  filteredOptions: Observable<string[]>

  constructor(private individualDataService: IndividualDataService) { }

  ngOnInit(): void {
    this.getUsername();
    //this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
    // setTimeout(() => {
    //   this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
    // }, 200);
  }

  getUsername() {
    this.individualDataService.getUserInfo().subscribe((respond) => {
      this._username = respond.map(userName => userName.username).sort((a, b) => a.localeCompare(b));
      console.log('_username1: ', this._username);
    }, (err)=> {
      console.log('error: ', err);
    }, () => {
      this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
      console.log('API request is completed.')
    });
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this._username.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
