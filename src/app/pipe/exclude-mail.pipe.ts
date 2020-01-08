import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excludeMail'
})
export class ExcludeMailPipe implements PipeTransform {

  transform(value: string): string {

    if (value.indexOf('<') > 0) {
      return value.slice(0, value.indexOf('<')).replace(/"/g, '');
    } else {
      return value.replace(/"/g, '');
    }
  }

}
