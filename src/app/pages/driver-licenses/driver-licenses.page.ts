import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-driver-licenses',
  templateUrl: './driver-licenses.page.html',
  styleUrls: ['./driver-licenses.page.scss'],
})
export class DriverLicensesPage implements OnInit {

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