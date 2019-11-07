import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { LoadingService, } from '../../../services/loading.service';
import { UserService } from '../../../services/user.service';
import { ApiServices } from '../../../services/api.services';

@Component({
  selector: 'app-platinumreferralprogramaccounts',
  templateUrl: './platinumreferralprogramaccounts.page.html',
  styleUrls: ['./platinumreferralprogramaccounts.page.scss'],
})
export class PlatinumreferralprogramaccountsPage implements OnInit {

  animation: string;
  color: string;
  hcolor: string;
  values: any;
  url: string;
  referrals: any;
  salesrepid: any;

  constructor(
    public router: Router,
    public httpClient: HttpClient,
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController,
    public authService: AuthService,
    public loadingService: LoadingService,
    public userService: UserService,
    public apiServices: ApiServices) { }

  ngOnInit() {
    this.hcolor = this.activatedRoute.snapshot.paramMap.get('color');
    this.salesrepid = this.authService.salesid;
    this.getData();
  }

  ionViewWillEnter() {
    this.animation = 'fade-in-bottom';
  }

  getData(): void {
    this.apiServices.getPlatinumReferralProgramAccounts(this.salesrepid)
      .subscribe(results => {
        this.referrals = results;
        this.loadingService.hideLoader();
      });
  }

  detailsPage(referral: any) {
    this.userService.setReferralOffice(referral.company);
    this.loadingService.showLoader();
    setTimeout(() => {
      this.router.navigateByUrl('/referraldetails/' + this.hcolor + '/' + referral.id);
    }, 300);
  }

  submenu() {
    this.router.navigateByUrl('/app/tabs/submenu');
  }

}