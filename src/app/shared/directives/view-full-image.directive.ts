import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Directive({
  selector: '[viewFullImage]'
})

export class ViewFullImageDirective {

  @HostBinding('title') elementTitle = 'Click To Enlarge Image';
  @HostBinding('class') elementClass = 'cursor-pointer';
  @Input('extraSource') extraSource: string;

  constructor(private shared: SharedService) {
  }

  @HostListener('click', ['$event']) onClick(event) {
    let image = "";
    // 
    if (this.extraSource) image = this.extraSource;
    else if (event.target.srcset) image = event.target.srcset;
    // 
    this.shared.showImageFullView(image);
  }
}
