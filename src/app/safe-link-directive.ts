import { Directive, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
 queryParam = input('myapp');
 
  constructor() {
    console.log('SafeLinkDirective initialized');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm(
      'You are about to leave this page. Do you want to continue?'
    );
    if (wantsToLeave) {
      const address = (event.target as HTMLAnchorElement).href;

      (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam();

      return;
    }
    event.preventDefault();
  }
}
