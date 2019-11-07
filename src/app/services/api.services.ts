import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { endpoint } from '../../global/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ApiServices {

  constructor(private http: HttpClient) { }

  /*
  // ACCOUNTS
  */
  getClinicalReferralOffices(salesid): Observable<any[]> {
    return this.http.get<any[]>(environment.api.url + endpoint.accounts.clinicalreferraloffices + salesid)
      .pipe(
        tap(_ => this.log('fetched getClinicalReferralOffices')),
        catchError(this.handleError('getClinicalReferralOffices', []))
      );
  }

  getPlatinumReferralProgramAccounts(salesid): Observable<any[]> {
    return this.http.get<any[]>(environment.api.url + endpoint.accounts.platinumreferralprogramaccounts + salesid)
      .pipe(
        tap(_ => this.log('fetched getPlatinumReferralProgramAccounts')),
        catchError(this.handleError('getPlatinumReferralProgramAccounts', []))
      );
  }

  getPlatinumReferralDetails(refid): Observable<any[]> {
    return this.http.get<any[]>(environment.api.url + endpoint.accounts.platinumreferraldetails + refid)
      .pipe(
        tap(_ => this.log('fetched getPlatinumReferralDetails')),
        catchError(this.handleError('getPlatinumReferralDetails', []))
      );
  }

  /*
  // ALERTS
  */
  getPendingPatients(salesid): Observable<any[]> {
    return this.http.get<any[]>(environment.api.url + endpoint.alert.pending + salesid)
      .pipe(
        tap(_ => this.log('fetched getPendingPatients')),
        catchError(this.handleError('getPendingPatients', []))
      );
  }

  getInactiveOffices(salesid): Observable<any[]> {
    return this.http.get<any[]>(environment.api.url + endpoint.alert.inactiveoffices + salesid)
      .pipe(
        tap(_ => this.log('fetched getInactiveOffices')),
        catchError(this.handleError('getInactiveOffices', []))
      );
  }

  /*
  // REFERRALS
  */
  getReferralsByMonth(): Observable<any[]> {
    return this.http.get<any[]>(environment.api.url + endpoint.referrals.referralsbymonth)
      .pipe(
        tap(_ => this.log('fetched getReferralsByMonth')),
        catchError(this.handleError('getReferralsByMonth', []))
      );
  }

  getPatientReferrals12Monts(refid): Observable<any[]> {
    return this.http.get<any[]>(environment.api.url + endpoint.referrals.patientreferrals12months + refid)
      .pipe(
        tap(_ => this.log('fetched getPatientReferrals12Monts')),
        catchError(this.handleError('getPatientReferrals12Monts', []))
      );
  }

  getPatientReferrals12MontsStatus(refid): Observable<any[]> {
    return this.http.get<any[]>(environment.api.url + endpoint.referrals.patientreferrals12monthsstatus + refid)
      .pipe(
        tap(_ => this.log('fetched getPatientReferrals12MontsStatus')),
        catchError(this.handleError('getPatientReferrals12MontsStatus', []))
      );
  }

  /*
  // REPORTS
  */
  getPatientSummaryReport(salesid): Observable<any[]> {
    return this.http.get<any[]>(environment.api.url + endpoint.reports.patientsummaryreport + salesid)
      .pipe(
        tap(_ => this.log('fetched getPatientSummaryReport')),
        catchError(this.handleError('getPatientSummaryReport', []))
      );
  }

  getPatientsByPhysician(salesid): Observable<any[]> {
    return this.http.get<any[]>(environment.api.url + endpoint.reports.getpatientsbyphysician + salesid)
      .pipe(
        tap(_ => this.log('fetched getPatientsByPhysician')),
        catchError(this.handleError('getPatientsByPhysician', []))
      );
  }

  getPatientsByCompany(salesid): Observable<any[]> {
    return this.http.get<any[]>(environment.api.url + endpoint.reports.getpatientsbycompany + salesid)
      .pipe(
        tap(_ => this.log('fetched getPatientsByCompany')),
        catchError(this.handleError('getPatientsByCompany', []))
      );
  }


  /*
  // LISTENER
  */
  sendRequestToListener(salesid, patid): Observable<any[]> {
    return this.http.post<any[]>(environment.api.url + endpoint.listener + salesid + '/' + patid, null)
      .pipe(
        tap(_ => this.log('fetched sendRequestToListener')),
        catchError(this.handleError('sendRequestToListener', []))
      );
  }

  /*
  // HANDLE ERRORS
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}