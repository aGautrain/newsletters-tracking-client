import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyMail'
})
export class OnlyMailPipe implements PipeTransform {

  transform(value: string): string {

    if (value.indexOf('<') > 0) {
      return value.slice(value.indexOf('<')).replace(/</g, '').replace(/>/g, '');
    } else {
      return value.replace(/"/g, '');
    }
  }

}
