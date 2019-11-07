import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'epochdate'
})
export class EpochdatePipe implements PipeTransform {

  transform(date: any, args?:any): any {
    if (date === undefined){
      //date = moment(1483302334682).format('MMMM D, YYYY');
      date = new Date(1483302334682).toISOString().split('T')[0];
    } else {
      date = new Date(date).toISOString().split('T')[0];
      date = date.split('-')[0];
    }
    return date;
  }

}