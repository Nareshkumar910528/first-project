import { Component, OnInit } from '@angular/core';
import {AbstractControl, Form, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-angular-forms',
  templateUrl: './angular-forms.component.html',
  styleUrls: ['./angular-forms.component.css']
})
export class AngularFormsComponent implements OnInit {
  backgroundImage: any;
  form: FormGroup;
  logoLight: string;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  hide = true;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.firstName = new FormControl('', Validators.compose([Validators.required]));
    this.lastName = new FormControl('', Validators.compose([Validators.required]));
    this.email = new FormControl('', Validators.compose([Validators.required, Validators.email]));
    this.password = new FormControl('',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        this.patternValidator(/[0-9]/, { hasNumber: true }),
        this.patternValidator(/[A-Z]/, { hasUpperCase: true }),
        this.patternValidator(/[a-z]/, { hasLowerCase: true }),
        this.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {hasSpecialCharacters: true,}),
      ])
    );
    this.form = fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    })
  }

  ngOnInit() {
    this.backgroundImage = "/assets/code_programming_symbols_140997_1920x1080.jpg";
    this.logoLight = "/assets/Angular_logo.png";
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

}
