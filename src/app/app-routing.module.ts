import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["tutorial"]);

const routes: Routes = [
  { path: 'app', loadChildren: './pages/tabs/tabs.module#TabsModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'tutorial', loadChildren: './pages/tutorial/tutorial.module#TutorialModule'},
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule'},
  { path: 'loginauto', loadChildren: './pages/loginauto/loginauto.module#LoginAutoModule'},
  { path: 'logout', loadChildren: './pages/logout/logout.module#LogoutModule'},
  { path: 'about', loadChildren: './pages/about/about.module#AboutModule'},
  { path: 'touchid', loadChildren: './pages/touchid/touchid.module#TouchidModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'personalprofile', loadChildren: './pages/personalprofile/personalprofile.module#PersonalprofileModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'recent', loadChildren: './pages/recent/recent.module#RecentModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'forgotpassword', loadChildren: './pages/forgotpassword/forgotpassword.module#ForgotpasswordPageModule' },
  { path: 'PasswordsPage/:color', loadChildren: './pages/passwords/passwords.module#PasswordsPagePageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'DriverLicensesPage/:color', loadChildren: './pages/driver-licenses/driver-licenses.module#DriverLicensesPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'BankAccountsPage/:color', loadChildren: './pages/bankaccounts/bankaccounts.module#BankAccountsPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'BankAccountPage', loadChildren: './pages/bankaccount/bankaccount.module#BankAccountPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'CreditCardsPage/:color', loadChildren: './pages/credit-cards/credit-cards.module#CreditCardsPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'driver-license-edit/:color', loadChildren: './pages/driver-license-edit/driver-license-edit.module#DriverLicenseEditPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: '', redirectTo: '/tutorial', pathMatch: 'full'},
  { path: '**', redirectTo: '/tutorial' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
