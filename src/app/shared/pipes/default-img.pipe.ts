import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'defaultImg'
})
export class DefaultImgPipe implements PipeTransform {
  transform(input): any {
    return environment.defaultImg;
  }

}

