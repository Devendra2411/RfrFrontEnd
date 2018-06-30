import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, args: string[]): string {
        const limit = args.length > 0 && args != null && args !== undefined ? parseInt(args[0], 10) : 20;
        const trail = args.length > 1 && args != null && args !== undefined ? args[1] : '...';
        if (value !== null) {
            return value.length > limit ? value.substring(0, limit) + trail : value;
        } else {
            return trail;
        }
       }
    }
