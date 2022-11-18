import { Input } from '@angular/core';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[moveNextByMaxLength], textarea[moveNextByMaxLength]',
})
export class MoveNextByMaxLengthDirective {

  @Input('nextElem') nextElem;
  @HostListener('keyup', ['$event']) onKeyDown(keyboardEvent: KeyboardEvent) {
    const target = keyboardEvent.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;

    if (!target || target.maxLength !== target.value.length) return;

    keyboardEvent.preventDefault();
    const { type } = target;
    let { nextElementSibling } = target
    nextElementSibling == null ? nextElementSibling = document.getElementById(this.nextElem) : '';
    while (nextElementSibling) {
      if (
        (nextElementSibling as HTMLInputElement | HTMLTextAreaElement).type ===
        type
      ) {
        (nextElementSibling as HTMLInputElement | HTMLTextAreaElement).focus();
        return;
      }

      nextElementSibling = nextElementSibling.nextElementSibling;
    }
  }

}
