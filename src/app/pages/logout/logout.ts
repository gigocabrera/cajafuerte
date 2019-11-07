import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
  styleUrls: ['logout.scss']
})
export class LogoutPage {

  email: any;
  password: any;
  values: any;
  loginErrorString: string;
  loginErrorTitle: string;

  constructor(
    public router: Router,
    public authService: AuthService) {}

    ionViewDidEnter() {
      this.authService.logout();
      this.router.navigateByUrl('/tutorial')
    }
}
