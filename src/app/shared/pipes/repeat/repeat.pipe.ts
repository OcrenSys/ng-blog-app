import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repeat',
  standalone: true,
})
export class RepeatPipe implements PipeTransform {
  transform(value: string | undefined, times: number): string {
    if (!value || times < 1) {
      return value ?? '';
    }

    return Array(times).fill(value).join(' ');
  }
}
