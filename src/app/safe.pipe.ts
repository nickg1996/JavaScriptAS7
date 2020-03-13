import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
    constructor(protected sanitizer: DomSanitizer) {}
    transform(value: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}
