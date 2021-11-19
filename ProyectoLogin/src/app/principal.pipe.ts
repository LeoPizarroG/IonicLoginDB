import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'principal'
})
export class PrincipalPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
