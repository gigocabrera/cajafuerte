import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.page.html',
  styleUrls: ['./credit-cards.page.scss'],
})
export class CreditCardsPage implements OnInit {

  hcolor: string;
  values: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.hcolor = this.activatedRoute.snapshot.paramMap.get('color');
    this.getData();
  }

  getData(): void {
    /* this.apiServices.getPatientSummaryReport(this.salesrepid)
      .subscribe(results => {
        this.patients = results;
        this.loadingService.hideLoader();
      }); */
      console.log('here luis');
      this.loadingService.hideLoader();
  }
}