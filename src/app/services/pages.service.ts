import { Injectable, EventEmitter } from '@angular/core';
import { PasswordsPage } from '../pages/passwords/passwords.page';
import { DriverLicensesPage } from '../pages/driver-licenses/driver-licenses.page';
import { BankAccountsPage } from '../pages/bank-accounts/bank-accounts.page';
import { CreditCardsPage } from '../pages/credit-cards/credit-cards.page';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor() { }

  public getPageReference(pageId: string): any {
		switch(pageId) {
			case 'PasswordsPage': return PasswordsPage;
			case 'DriverLicensesPage': return DriverLicensesPage;
			case 'BankAccountsPage': return BankAccountsPage;
			case 'CreditCardsPage': return CreditCardsPage;
		}
	}

}
