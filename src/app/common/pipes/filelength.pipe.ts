import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filelength'
})
export class FilelengthPipe implements PipeTransform {

  transform(fileSizeInBytes: any, args?: any): any {
    var i = -1;
    var byteUnits = [' B',' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    if(fileSizeInBytes < 1000){
      return fileSizeInBytes + byteUnits[0];
    }
    else{
      do {
        fileSizeInBytes = fileSizeInBytes / 1000;
        i++;
      } while (fileSizeInBytes > 1000);

      return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i+1];
    }
  }

}
