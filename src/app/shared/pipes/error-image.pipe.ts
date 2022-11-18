import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'errorImage'
})
export class ErrorImagePipe implements PipeTransform {

  transform(input): any {
    return environment.defaultErrorImg;
  }

}
