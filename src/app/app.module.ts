import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient} from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { SecureStorage } from '@ionic-native/secure-storage/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { Network } from '@ionic-native/network/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LoadingService } from '../app/services/loading.service'
import { AuthService } from '../app/services/auth.service'
import { AuthGuardService } from '../app/services/authguard.service'
import { UserService } from '../app/services/user.service'
import { TokenInterceptor } from '../app/interceptors/token.interceptor';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthGuard, AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { environment } from '../environments/environment';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthGuardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    InAppBrowser,
    SafariViewController,
    SecureStorage,
    AppVersion,
    AppRate,
    TouchID,
    Network,
    AngularFireAuthGuard,
    LoadingService,
    AuthService,
    AuthGuardService,
    UserService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
