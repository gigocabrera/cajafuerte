import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.html',
  styleUrls: ['favorites.scss'],
})
export class Favorites {

  favArray: {};
  noitemsfound: boolean = true;

  constructor(
    public authService: AuthService,
    public loadingService: LoadingService) { 

    //this.loadingService.showLoader();

  }

  ionViewDidEnter() {
    //this.loadingService.hideLoader();
  }

  deleteRecent() {
    console.log('delete favorites');
  }

}
