import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, MenuController } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";

export interface Slide {
  title: string;
  description: string;
  icon: string;
  slideClass: string;
  titleClass: string;
  image: string;
}

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  showSkip = true;
  slideData: Slide[];
  values: any;

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    public router: Router,
    public menuController: MenuController,
    public translate: TranslateService
  ) { 
    this.translate.get([
      "TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE4_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_DESCRIPTION",
      "TUTORIAL_SLIDE4_DESCRIPTION"
    ])
    .subscribe((values) => {
      this.values = values;
    });

    this.slideData = [
      {
        title: this.values.TUTORIAL_SLIDE1_TITLE,
        description: this.values.TUTORIAL_SLIDE1_DESCRIPTION,
        icon: '',
        slideClass: 'slide1',
        titleClass: 'slide-title app-title',
        image: 'ma_logo_simple.svg',
      }
    ];
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuController.enable(false);
  }
  
  startApp() {
    //this.router.navigateByUrl('/login');
    this.router.navigateByUrl('/app/tabs/tab1');
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

}
