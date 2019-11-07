import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Chart } from 'chart.js';
import { AuthService } from '../../../services/auth.service';
import { LoadingService, } from '../../../services/loading.service';
import { UserService } from '../../../services/user.service';
import { ApiServices } from '../../../services/api.services';

@Component({
  selector: 'app-platinumreferraldetails',
  templateUrl: './referraldetails.page.html',
  styleUrls: ['./referraldetails.page.scss'],
})
export class ReferralDetailsPage implements OnInit {

  labelResult: string[] = [];
  dataResult: number[] = [];
  hcolor;
  refID;
  chartData;
  chartDataStatus;
  title: string;
  //item = '';
  
  item: {id: string, company: string, name: string, address: string, city: string, state: string, zip: string, phone: string, fax: string, email: string, totalReferralsLast12Weeks: string, totalReferralsLast12Months: string, totalReferrals: string, lastReferralSent: string} = {
    id: '',
    company: '', 
    name: '',
    address: '', 
    city: '', 
    state: '', 
    zip: '', 
    phone: '', 
    fax: '', 
    email: '',
    totalReferralsLast12Weeks: '',
    totalReferralsLast12Months: '',
    totalReferrals: '',
    lastReferralSent: ''
  };

  months = [
    { value: 0, name: 'January' },
    { value: 1, name: 'February' },
    { value: 2, name: 'March' },
    { value: 3, name: 'April' },
    { value: 4, name: 'May' },
    { value: 5, name: 'June' },
    { value: 6, name: 'July' },
    { value: 7, name: 'August' },
    { value: 8, name: 'September' },
    { value: 9, name: 'October' },
    { value: 10, name: 'November' },
    { value: 11, name: 'December' },
  ];

  @ViewChild('valueBarsCanvas', { static: true }) valueBarsCanvas;
  valueBarsChart: any;

  constructor(
    public httpClient: HttpClient,
    public toastController: ToastController,
    public activatedRoute: ActivatedRoute,
    public emailComposer: EmailComposer,
    public authService: AuthService,
    public loadingService: LoadingService,
    public userService: UserService,
    public apiServices: ApiServices) { }

    ngOnInit() {
      this.hcolor = this.activatedRoute.snapshot.paramMap.get('color');
      this.refID = this.activatedRoute.snapshot.paramMap.get('refid');
      this.title = this.userService.getReferralOffice();
      this.chartData = '';
      this.chartDataStatus = '';
      this.getData();
    }
  
    getData(): void {
      this.apiServices.getPatientReferrals12Monts(this.refID)
        .subscribe(results => {
          this.chartData = results;
          this.createChart1();
        });

      this.apiServices.getPlatinumReferralDetails(this.refID)
        .subscribe(results2 => {
          this.item = results2[0];
          //console.log(this.item);
        });
      
      this.loadingService.hideLoader();
    }
  
    getReportValues() {
      var count = this.chartData.length;
      var counter = 0;
      while(count > 0){
        var thisMonth = +this.chartData[counter].month - 1;
        var thisYear: string = this.chartData[counter].year;
        var thisValue = this.chartData[counter].count;
        var thisMonthName = this.months[thisMonth].name;
        this.labelResult[counter] = thisMonthName + '-' + thisYear.substring(2,4);
        this.dataResult[counter] = thisValue;
        counter++;
        count --;
      }
    }
  
    createChart1() {
  
      // Get values for the chart
      this.getReportValues();
  
      // Set global variables
      Chart.defaults.global.defaultFontFamily = 'Lato';
      Chart.defaults.global.defaultFontColor = '#777';
  
      // Create the chart
      this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: this.labelResult,
          datasets: [{
            label: 'Referrals',
            data: this.dataResult,
            backgroundColor:[
              'rgb(93, 173, 226, 0.6)',
              'rgb(82, 190, 128, 0.6)',
              'rgb(231, 76, 60, 0.6)',
              'rgb(244, 208, 63, 0.6)',
              'rgb(142, 68, 173, 0.6)',
              'rgb(251, 140, 0, 0.6)',
              'rgb(93, 173, 226, 0.6)',
              'rgb(82, 190, 128, 0.6)',
              'rgb(231, 76, 60, 0.6)',
              'rgb(244, 208, 63, 0.6)',
              'rgb(142, 68, 173, 0.6)',
              'rgb(251, 140, 0, 0.6)'
            ],
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: 2,
            hoverBorderColor: '#000'
          }]
        },
        options: {
          legend: {
            display: false
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItems, data) {
                return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
              }
            }
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            yAxes: [{
              ticks: {
                callback: function (value, index, values) {
                  return value;
                },
                suggestedMin: 0
              }
            }]
          },
          animation: {
            onComplete: function () {
              var ctx = this.chart.ctx;
              ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
              ctx.fillStyle = "black";
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
      
              this.data.datasets.forEach(function (dataset)
              {
                for (var i = 0; i < dataset.data.length; i++) {
                  for(var key in dataset._meta)
                  {
                    var model = dataset._meta[key].data[i]._model;
                    ctx.fillText(dataset.data[i], model.x, model.y - 5);
                  }
                }
              });
            }
          }
        }
      });
  
    }

    call(number) {
      window.open('tel:' + number);
    }

    email(emailaddress) {
      let email = {
        to: emailaddress,
        subject: 'Hello',
        body: '',
        isHtml: true
      }
      this.emailComposer.open(email);
    }
  
  }