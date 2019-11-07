import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { LoadingService, } from '../../../services/loading.service';
import { ApiServices } from '../../../services/api.services';

@Component({
  selector: 'app-patientsummarybycompany',
  templateUrl: './patientsummarybycompany.page.html',
  styleUrls: ['./patientsummarybycompany.page.scss'],
})
export class PatientsummarybycompanyPage implements OnInit {

  animation: string;
  color: string;
  hcolor: string;
  values: any;
  url: string;
  patients: any;
  salesrepid: any;
  result: any[];

  constructor(
    public router: Router,
    public httpClient: HttpClient,
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController,
    public authService: AuthService,
    public loadingService: LoadingService,
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
    this.apiServices.getPatientsByCompany(this.salesrepid)
      .subscribe(results => {
        this.patients = results;
        var groups = new Set(this.patients.map(item => item.company))
        this.result = [];
        groups.forEach(g =>
          this.result.push({
            name: g,
            values: this.patients.filter(i => i.company === g)
          }
          ))
        this.loadingService.hideLoader();
      });
  }

  runReport(pat: any) {
    this.presentAlertConfirm(pat);
  }

  submenu() {
    this.router.navigateByUrl('/app/tabs/submenu');
  }

  async presentAlertConfirm(pat) {
    const alert = await this.alertController.create({
      header: 'Please Confirm',
      subHeader: 'Generate Report for ' + pat.lastname + ', ' + pat.firstname,
      message: 'By clicking Send Report below, you are agreeing to the Acentus Patient Summary Report TERMS OF USE',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Send Report',
          handler: () => {
            this.SendRequest(pat.id);
          }
        }
      ]
    });

    await alert.present();
  }

  SendRequest(id) {
    this.apiServices.sendRequestToListener(this.salesrepid, id)
      .subscribe(data => {
        console.log(data);
        this.presentToast();
      });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your report will be emailed to your inbox.',
      duration: 3000,
      color: 'danger'
    });
    toast.present();
  }

}