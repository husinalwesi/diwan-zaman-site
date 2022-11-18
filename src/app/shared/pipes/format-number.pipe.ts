import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(price: any): string {
    if(!price) price = 0;
    return price.toLocaleString();
  }

}
