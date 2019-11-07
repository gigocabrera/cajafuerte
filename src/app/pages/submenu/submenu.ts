import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'page-submenu',
  templateUrl: 'submenu.html',
  styleUrls: ['submenu.scss']
})

export class SubMenu {

  title: string;
  animation: string;
  category: string;
  hcolor: string;
  values: any;
  url: string;
  pages: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    public emailComposer: EmailComposer,
    public iab: InAppBrowser,
    public safariViewController: SafariViewController,
    public platform: Platform,
    public authService: AuthService,
    public loadingService: LoadingService,
    public userService: UserService) {}

  ngOnInit() {
    
    // get active category
    this.category = this.activatedRoute.snapshot.paramMap.get('catid');

    // default header color if none selected
    this.hcolor = this.userService.getMenuColor(this.category);
    this.title = this.userService.getSubmenuTitle();

    //this.pages = this.authService.getSubmenu(this.category);
    this.pages = this.authService.getActiveSubMenu(this.category);

    // hide loader
    this.loadingService.hideLoader();

  }

  ionViewWillEnter() {
    this.animation = 'fade-in-bottom';
  }

  openPage(menu: any) {
    if (menu.type === 'browser') {
      this.doBrowser(menu);
    } else if (menu.type === 'action') {
      this.doAction(menu);
    } else {
      this.loadingService.showLoader();
      setTimeout(() => {
        this.doPage(menu);
      }, 300);
    }
  }

  menu() {
    this.router.navigateByUrl('/app/tabs/menu');
  }

  doBrowser(menu: any) {
    console.log('do browser here');
  }

  doAction(menu: any) {
    console.log('do action here');
  }

  doPage(menu: any) {
    switch(menu.page) { 
      case 'referralsbymonth': { 
        this.router.navigateByUrl('/referralsbymonth/' + menu.color);
        break; 
      }
      case 'patientsummary': { 
        this.router.navigateByUrl('/patientsummary/' + menu.color);
        break; 
      }
      case 'patientsummarybyphysician': { 
        this.router.navigateByUrl('/patientsummarybyphysician/' + menu.color);
        break; 
      }
      case 'patientsummarybycompany': { 
        this.router.navigateByUrl('/patientsummarybycompany/' + menu.color);
        break; 
      }
      case 'clinicalreferraloffices': { 
        this.router.navigateByUrl('/clinicalreferraloffices/' + menu.color);
        break; 
      }
      case 'platinumreferralprogramaccounts': { 
        this.router.navigateByUrl('/platinumreferralprogramaccounts/' + menu.color);
        break; 
      }
    }
  }
  
  sendEmail() {
    let email = {
      to: 'service@acentus365.com',
      subject: 'Acentus App Email',
      body: 'This is just a test from the app...',
      isHtml: true
    }
    this.emailComposer.open(email);
  }

  openSafariViewController(url) {

    this.safariViewController.isAvailable()
      .then((available: boolean) => {
          if (available) {

            this.safariViewController.show({
              url: url,
              hidden: false,
              animated: false,
              transition: 'curl',
              enterReaderModeIfAvailable: true,
              tintColor: this.hcolor
            })
            .subscribe((result: any) => {
                if(result.event === 'opened') console.log('Opened');
                else if(result.event === 'loaded') console.log('Loaded');
                else if(result.event === 'closed') console.log('Closed');
              },
              (error: any) => console.error(error)
            );

          } else {
            // use fallback browser, example InAppBrowser
            const browser = this.iab.create(url);
            browser.close();
          }
        }
      );
  }

}
