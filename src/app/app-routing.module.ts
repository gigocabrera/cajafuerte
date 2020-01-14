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
  { path: 'pendingpatients', loadChildren: './pages/alerts/pendingpatients/pendingpatients.module#PendingpatientsPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'inactiveoffice', loadChildren: './pages/alerts/inactiveoffice/inactiveoffice.module#InactiveofficePageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'inactiveofficedetails', loadChildren: './pages/alerts/inactiveofficedetails/inactiveofficedetails.module#InactiveofficedetailsPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'referralsbymonth/:color', loadChildren: './pages/dashboard/referralsbymonth/referralsbymonth.module#ReferralsbymonthPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'dashboardreferrals/:color/:refid', loadChildren: './pages/charts/dashboardreferrals/dashboardreferrals.module#DashboardreferralsPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'patientsummary/:color', loadChildren: './pages/reports/patientsummary/patientsummary.module#PatientsummaryPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'patientsummarybyphysician/:color', loadChildren: './pages/reports/patientsummarybyphysician/patientsummarybyphysician.module#PatientsummarybyphysicianPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'patientsummarybycompany/:color', loadChildren: './pages/reports/patientsummarybycompany/patientsummarybycompany.module#PatientsummarybycompanyPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'clinicalreferraloffices/:color', loadChildren: './pages/accounts/clinicalreferraloffices/clinicalreferraloffices.module#ClinicalreferralofficesPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'platinumreferralprogramaccounts/:color', loadChildren: './pages/accounts/platinumreferralprogramaccounts/platinumreferralprogramaccounts.module#PlatinumreferralprogramaccountsPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'referraldetails/:color/:refid', loadChildren: './pages/accounts/referraldetails/referraldetails.module#ReferraldetailsPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: '', redirectTo: '/tutorial', pathMatch: 'full'},
  { path: '**', redirectTo: '/tutorial' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
