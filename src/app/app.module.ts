import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';;
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RxjsProjComponent } from './components/rxjs-proj/rxjs-proj.component';
import { AngularFormsComponent } from './components/angular-forms/angular-forms.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { AngularFormsMediumComponent } from './components/angular-forms-medium/angular-forms-medium.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AutocompleteComponent } from './components/angular-materials/autocomplete/autocomplete.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AuthGuardComponent } from './services/auth/auth-guard/auth-guard.component';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    RxjsProjComponent,
    AngularFormsComponent,
    AngularFormsMediumComponent,
    AutocompleteComponent,
    AuthGuardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass :'toast-top-center',
      preventDuplicates: true,
    })
  ],
  providers: [AuthGuardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
