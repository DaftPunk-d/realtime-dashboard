import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {

  transform(value:any) {
    if (value) {
      return value.charAt(0).toUpperCase()
    }
    return value;
  }

}
