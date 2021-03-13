import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import {RxjsProjComponent} from './components/rxjs-proj/rxjs-proj.component';
import {AngularFormsComponent} from './components/angular-forms/angular-forms.component';
import {AngularFormsMediumComponent} from './components/angular-forms-medium/angular-forms-medium.component';
import {AutocompleteComponent} from './components/angular-materials/autocomplete/autocomplete.component';
import {AuthGuardComponent} from './services/auth/auth-guard/auth-guard.component';
import { PromiseVsObservableComponent } from './components/promise-vs-observable/promise-vs-observable.component';
import { QrCodeGeneratorComponent } from './components/qr-code/qr-code-generator/qr-code-generator.component';

const routes: Routes = [
  { path: 'rxjs-proj', component: RxjsProjComponent, canActivate: [AuthGuardComponent]},
  { path: 'promise-vs-observable', component: PromiseVsObservableComponent},
  { path: 'angular-forms', component: AngularFormsComponent},
  { path: 'angular-forms-medium', component: AngularFormsMediumComponent},
  { path: 'angular-materials/autocomplete', component: AutocompleteComponent},
  { path: 'qr-code/qr-code-generator', component: QrCodeGeneratorComponent},
  { path: '',   redirectTo: 'qr-code/qr-code-generator', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
