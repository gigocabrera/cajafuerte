import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-inactiveofficedetails',
  templateUrl: './inactiveofficedetails.page.html',
  styleUrls: ['./inactiveofficedetails.page.scss'],
})
export class InactiveofficedetailsPage implements OnInit {

  item: {referrerId: string, company: string, address: string, city: string, state: string, zip: string, phone: string, territory: string, entryDate: string, salesRep: string} = {
    referrerId: '',
    company: '', 
    address: '', 
    city: '', 
    state: '', 
    zip: '', 
    phone: '', 
    territory: '', 
    entryDate: '',
    salesRep: ''
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    public userService: UserService) { }

    ngOnInit() {
      this.item = this.userService.getInactiveOffice();
    }

}
