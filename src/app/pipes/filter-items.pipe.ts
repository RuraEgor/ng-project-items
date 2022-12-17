import { Pipe, PipeTransform } from '@angular/core';
import { IItem } from '../models/product';

@Pipe({
  name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {
  
  transform(items: IItem[], search: string): IItem[] {
    return items.filter( p => p.title.toLowerCase().includes(search.toLowerCase()))
  }
  
}
