import { Component, OnInit } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-auth-guard',
  templateUrl: './auth-guard.component.html',
  styleUrls: ['./auth-guard.component.css']
})
export class AuthGuardComponent implements CanActivate {

  constructor(private toastrService: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (sessionStorage.getItem('tenantCode') === '') {
      return true;
    } else  {
      window.alert('Access is denied');
      console.log('Unable to route')
      return false;
    }
  }
}
