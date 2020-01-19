import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.page.html',
  styleUrls: ['./passwords.page.scss'],
})
export class PasswordsPage {

  hcolor: string;
  items: any;
  values: any;
  noitemsfound: boolean = false;
  groupedAccounts = [];
  currentAccounts = [];
  loadedGroupedAccounts = [];

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
    this.getData();
  }

  getData() {
    this.hcolor = this.activatedRoute.snapshot.paramMap.get('color');
    this.authService.getAllAccounts().on('value', (accounts) => {
      var that = this;
      this.groupedAccounts = [];
      let currentLetter = '';
      accounts.forEach( spanshot => {
        let account = spanshot.val();
        account.favoriteid = account.favoriteid === undefined ?  '' : account.favoriteid;
        let tempAccount = ({
          $key: spanshot.key,
          description: account.description,
          name: account.name,
          favoriteid: account.favoriteid
          //icon: this.authService.forms[0].icon,
          //color: this.authService.forms[0].color,
        });
        let thisLetter = tempAccount.name.charAt(0);
        thisLetter = thisLetter.toUpperCase();
        if(thisLetter != currentLetter){
          currentLetter = tempAccount.name.charAt(0).toUpperCase();
          currentLetter = currentLetter.toUpperCase();
          let newGroup = {
            letter: currentLetter,
            accounts: []
          };
          this.currentAccounts = newGroup.accounts;
          that.groupedAccounts.push(newGroup);
        }
        this.currentAccounts.push(tempAccount);
      })
      this.loadedGroupedAccounts = that.groupedAccounts;

      // Disable loading controller when the promise is complete
      this.loadingService.hideLoader();
    });


  }

  addItem() {
    console.log('add item here');
  }
  
}