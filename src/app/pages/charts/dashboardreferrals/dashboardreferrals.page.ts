import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { AuthService } from '../../../services/auth.service';
import { LoadingService, } from '../../../services/loading.service';
import { UserService } from '../../../services/user.service';
import { ApiServices } from '../../../services/api.services';

@Component({
  selector: 'app-dashboardreferrals',
  templateUrl: './dashboardreferrals.page.html',
  styleUrls: ['./dashboardreferrals.page.scss'],
})
export class DashboardreferralsPage implements OnInit {

  labelResult: string[] = [];
  dataResult: number[] = [];
  labelResult2: string[] = [];
  dataResult2: number[] = [];
  hcolor;
  refID;
  chartData;
  chartDataStatus;
  title: string;

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
  @ViewChild('valueBarsCanvas2', { static: true }) valueBarsCanvas2;
  valueBarsChart: any;
  valueBarsChart2: any;

  constructor(
    public httpClient: HttpClient,
    public toastController: ToastController,
    public activatedRoute: ActivatedRoute,
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

    /* // Call API 
    let url2: any = environment.api.url + environment.referrals.patientreferrals12monthsstatus' + this.refID;
    this.httpClient.get(url2, httpOptions).subscribe(res => {
      this.chartDataStatus = res;
      console.log(this.chartDataStatus);
      this.createChart2();
    }); */

  }

  getData(): void {
    this.apiServices.getPatientReferrals12Monts(this.refID)
      .subscribe(results => {
        this.chartData = results;
        this.createChart1();
        this.loadingService.hideLoader();
      });
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

  getReportValues2() {

    /* var jsonfile = this.chartDataStatus;
    var labels = jsonfile.map(function(e) {
      console.log (e.month);
      return e.month;
    }) */

    var count = this.chartDataStatus.length;
    var counter = 0;
    while(count > 0){
      var thisMonth = +this.chartDataStatus[counter].month - 1;
      var thisYear: string = this.chartDataStatus[counter].year;
      var thisValue = this.chartDataStatus[counter].count;
      var thisMonthName = this.months[thisMonth].name;
      this.labelResult2[counter] = thisMonthName + '-' + thisYear.substring(2,4);
      this.dataResult2[counter] = thisValue;
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

  createChart2() {

    /* const jsonData = JSON.parse(this.chartDataStatus);
    const colors = ['yellow', 'green', 'blue']; // purely optional

    const months = jsonData.reduce((uniqueMonths, record) => {
      // find unique months that will be base to our datasets
      if (!uniqueMonths.find(month => month === record.month))
        uniqueMonths.push(record.month);
      return uniqueMonths;
    }, []);

    const status = jsonData.reduce((uniqueStatus, record) => {
      // get labels for our chart
      if (!uniqueStatus.find(status => status === record.status))
      uniqueStatus.push(record.lastUpdate);
      return uniqueStatus;
    }, []);
    console.log(JSON.stringify(months));
    const datasets = months.map((month, index) => {
      const label = month;
      const backgroundColor = colors[index]; // purely optional
      const data = status.map(status => {
        const valueRecord = jsonData.find(record => record.month === month && record.status === status);
        if (!valueRecord) return 0;  // if value record is not defined, return 0;
        return valueRecord.count;
      });

      return {
        // here we return dataset
        label,
        backgroundColor,
        data,
        stack: 'main' // here we define the stack
      };
    }); */

    // Get values for the chart
    this.getReportValues2();

    // Set global variables
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontColor = '#777';

    // Create the chart
    this.valueBarsChart2 = new Chart(this.valueBarsCanvas2.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labelResult2,
        datasets: [{
          label: 'Referrals',
          data: this.dataResult2,
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
        title: {
          display: false
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });

  }

}