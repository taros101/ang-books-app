import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class TruncatePipe {
  transform(value: string, args: string) : string {
    let limit = args ? parseInt(args, 10) : 10;
    let stringArr = value.split(' ')
    let trail = '...';

    // Limit by words
    return stringArr.length > limit ? stringArr.slice(0, limit).join(' ') + trail : stringArr.join(' ')

    // Limit by letters
    // return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}