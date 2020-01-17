import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.page.html',
  styleUrls: ['./bank-accounts.page.scss'],
})
export class BankAccountsPage {

  hcolor: string;
  items: any;
  values: any;
  noitemsfound: boolean = false;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController,
    public authService: AuthService,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.hcolor = this.activatedRoute.snapshot.paramMap.get('color');
    this.items = this.authService.getAllDriverLicenses();
    this.loadingService.hideLoader();
  }

  addItem() {
    
  }
  
}