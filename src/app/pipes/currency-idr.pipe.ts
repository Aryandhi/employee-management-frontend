import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyIdr'
})
export class CurrencyIdrPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return 'Rp 0';
    return 'Rp ' + value.toLocaleString('id-ID', { minimumFractionDigits: 0 });
  }
}
