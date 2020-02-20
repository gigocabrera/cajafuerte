import { Injectable, EventEmitter } from '@angular/core';
import { Config } from '@ionic/angular';
//import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  animation: string = 'fade-in-bottom';
  keepmesignedin: boolean = false;
  currentLang: string;
  isTouchidEnabled: boolean = false;
  inactiveOffice: any;
  submenuTitle: string;
  referralOffice: string;
  announcement: string = ''

  constructor(
    public config: Config,
    public translate: TranslateService) {}

  getLanguage() {
    /* return this.storage.get('language').then((val) => {
      this.currentLang = val;
      return this.currentLang;
    }); */
  }

  getAnimation() {
    /* return this.storage.get('animation').then((val) => {
      if (val != null) {
        this.animation = val;
      }
      return this.animation;
    }); */
  }

  getKeepmesignedin() {
    /* return this.storage.get('keepmesignedin').then((val) => {
      this.keepmesignedin = val;
      return this.keepmesignedin;
    }); */
  }

  // add event
  public onLangChanged: EventEmitter<string> = new EventEmitter<string>();

  useLanguage(lang: string) : void {
    /* this.currentLang = lang;
    this.storage.set('language', lang);
    this.onLangChanged.emit(lang); */
  }

  useKeepmesignedin(keep: boolean) : void {
    /* this.keepmesignedin = keep;
    this.storage.set('keepmesignedin', keep); */
  }

  useAnimation(animation: string) : void {
    /* this.animation = animation;
    this.storage.set('animation', animation); */
  }
  
  refreshConfig() {
    this.translate.get(["BACK_BUTTON"]).subscribe((values) => {
      this.config.set('backButtonText', values.BACK_BUTTON);
    });
  }

  getInactiveOffice() {
    return this.inactiveOffice;
  }

  setInactiveOffice(menu) {
    this.inactiveOffice = menu;
  }

  getMenuColor(category) {
    // dynamic background color
    var hcolor: string;
    switch(category) { 
      case 'dashboard': { 
        hcolor = 'orange';
        this.submenuTitle = 'Company Dashboard';
        break; 
      } 
      case 'reports': { 
        hcolor = 'purple';
        this.submenuTitle = 'Reports';
        break; 
      }
      case 'accounts': { 
        hcolor = 'green';
        this.submenuTitle = 'Accounts';
        break; 
      }
      default: { 
        hcolor = 'primary';
        break; 
      }
    }
    return hcolor;
  }

  getSubmenuTitle() {
    return this.submenuTitle;
  }

  getReferralOffice() {
    return this.referralOffice;
  }

  setReferralOffice(office) {
    this.referralOffice = office;
  }

  getAnnouncement() {
    return this.announcement;
  }

  setAnnouncement(msg) {
    this.announcement = msg;
  }

}
