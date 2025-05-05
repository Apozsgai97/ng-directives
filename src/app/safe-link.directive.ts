import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
 queryParam = input('myapp');
 private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
 
  constructor() {
    console.log('SafeLinkDirective initialized');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm(
      'You are about to leave this page. Do you want to continue?'
    );
    if (wantsToLeave) {
      const address = this.hostElementRef.nativeElement.href

      this.hostElementRef.nativeElement.href =
        address + '?from=' + this.queryParam();

      return;
    }
    event.preventDefault();
  }
}
