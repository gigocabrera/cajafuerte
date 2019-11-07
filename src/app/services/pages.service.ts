import { Injectable, EventEmitter } from '@angular/core';
/* import { PasswordsPage } from '../pages/passwords/passwords';
import { DriverLicensesPage } from '../pages/driverlicenses/driverlicenses';
import { BankAccountsPage } from '../pages/bankaccounts/bankaccounts';
import { CreditCardsPage } from '../pages/creditcards/creditcards'; */

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor() { }

  public getPageReference(pageId: string): any {
		switch(pageId) {
			/* case 'PasswordsPage': return PasswordsPage;
			case 'DriverLicensesPage': return DriverLicensesPage;
			case 'BankAccountsPage': return BankAccountsPage;
			case 'CreditCardsPage': return CreditCardsPage; */
		}
	}

}
