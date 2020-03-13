import { Pipe, PipeTransform } from '@angular/core';
import {Content} from './content-card/content-card-helper';

@Pipe({
  name: 'filterType'
})
export class FilterTypePipe implements PipeTransform {

  transform(contentList: Content[], typeName: string): Content[] {
    return contentList.filter(content=>content.type === typeName ? content : null);
  }

}
