import { Component, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AuthService } from '../../services/auth.service';
//import { PickNotesPage } from '../../pages/picknotes/picknotes';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bankaccount',
  templateUrl: './bankaccount.page.html',
  styleUrls: ['./bankaccount.page.scss'],
})
export class BankAccountPage {

  validationMessage: string;
  showValidationMessage: boolean = false;
  title: string;
  showSkip = false;
  mode: string;
  key: string;
  values: any;
  account: {owner: string, name: string, namelower: string, nickname: string, accounttype: string, number: string, routingnumber: string, notes: string, recentid: string} = {
    owner: '', 
    name: '', 
    namelower: '', 
    nickname: '',
    accounttype: '', 
    number: '', 
    routingnumber: '', 
    notes: '', 
    recentid: ''
  };

  currentHeight: number = 0;
  
  constructor() { }

  ngOnInit() {
  }

}
