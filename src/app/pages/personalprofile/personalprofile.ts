import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-personalprofile',
  templateUrl: 'personalprofile.html',
  styleUrls: ['personalprofile.scss'],
})
export class Personalprofile {

  public user = {};
  
  constructor(
      private loadingService: LoadingService,
      public authService: AuthService,
      public userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserData();
  }

}
