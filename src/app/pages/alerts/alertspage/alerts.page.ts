import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoadingService } from '../../../services/loading.service';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {

  animation: any;
  announcement: Observable<any>;

  constructor(
    public router: Router,
    public authService: AuthService,
    public loadingService: LoadingService,
    public userService: UserService) {}

  ngOnInit() {
    this.announcement = this.authService.getAnnoucement();
  }

  ionViewWillEnter() {
    this.userService.getAnimation().then((val)=>{
      this.animation = val;
    });
  }

  openAlert(item) {
    this.loadingService.showLoader();
    setTimeout(() => {
      if (item === 1) {
        this.router.navigateByUrl('/pendingpatients');
      }
      else
      {
        this.router.navigateByUrl('/inactiveoffice');
      }
    }, 500);
  }

}