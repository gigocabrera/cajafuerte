import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async logOut(): Promise<void> {
    console.log('logging out');
    await this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
