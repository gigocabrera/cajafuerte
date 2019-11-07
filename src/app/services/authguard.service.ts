import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../app/services/auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  authenticated: boolean = false;

  constructor(
    public router: Router,
    public authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.authService.user.uid == '') {
        this.router.navigate(['/tutorial']);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }
}  