import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(text:string, limit:number = 15): string {
    let textTruncate = '';

    if(text.length > limit){
      textTruncate = text.substring(0, limit) + ' ...';
    }

    return textTruncate;
  }

}
