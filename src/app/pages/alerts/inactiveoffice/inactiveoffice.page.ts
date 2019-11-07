import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { LoadingService, } from '../../../services/loading.service';
import { UserService } from '../../../services/user.service';
import { ApiServices } from '../../../services/api.services';

@Component({
  selector: 'app-inactiveoffice',
  templateUrl: './inactiveoffice.page.html',
  styleUrls: ['./inactiveoffice.page.scss'],
})
export class InactiveofficePage implements OnInit {

  animation: string;
  color: string;
  hcolor: string;
  values: any;
  url: string;
  items: any;
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
    this.color = this.activatedRoute.snapshot.paramMap.get('color');
    this.salesrepid = this.authService.salesid;
    this.getData();
  }

  ionViewWillEnter() {
    this.animation = 'fade-in-bottom';
  }

  getData(): void {
    this.apiServices.getInactiveOffices(this.salesrepid)
      .subscribe(results => {
        this.items = results;
        this.loadingService.hideLoader();
      });
  }

  openItemDetails(item) {
    this.userService.setInactiveOffice(item);
    this.router.navigateByUrl('/inactiveofficedetails');
  }

}
