import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import {RxjsProjComponent} from './components/rxjs-proj/rxjs-proj.component';

const routes: Routes = [
  { path: 'rxjs-proj', component: RxjsProjComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
