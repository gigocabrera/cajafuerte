import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
  styleUrls: ['menu.scss']
})

export class MenuPage {

  tl: any;
  pages: any;
  values: any;
  lastsignin: any;
  animation: any;
  announcement: Observable<any>;

  constructor(
    public router: Router,
    public menuController: MenuController,
    public translate: TranslateService,
    public authService: AuthService,
    public loadingService: LoadingService,
    public userService: UserService,
    public actionSheetController: ActionSheetController,
    public pagesService: PagesService) {}

  ngOnInit() {
    this.pages = this.authService.getMenu();
    this.announcement = this.authService.getAnnoucement();
  }

  ionViewWillEnter() {
    
    // get animation
    this.userService.getAnimation().then((val)=>{
      this.animation = val;
    });

    this.translate.get(["SELECT_OPTION","LOGOUT_APP","CANCEL_TITLE"])
    .subscribe((values) => {
      this.values = values;
    });
  }

  ionViewDidEnter() {
    this.menuController.enable(true);
    this.loadingService.hideLoader();
  }

  openPage(item: any) {
    this.loadingService.showLoader();
    let page = this.pagesService.getPageReference(item.component);
  }
  
}