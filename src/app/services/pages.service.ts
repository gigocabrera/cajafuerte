import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor() { }

  public getPageReference(pageId: string): any {
		switch(pageId) {
			case 'PasswordsPage': return 'PasswordsPage';
			case 'DriverLicensesPage': return 'DriverLicensesPage';
			case 'BankAccountsPage': return 'BankAccountsPage';
			case 'CreditCardsPage': return 'CreditCardsPage';
		}
	}
}