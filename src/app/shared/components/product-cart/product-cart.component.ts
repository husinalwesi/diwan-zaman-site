import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/i18n/translation.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {
  language: string = "en";
  @Input() product: any;
  @Output() removeEmiter = new EventEmitter();
  @Output() changeQTY = new EventEmitter();

  constructor(
    private translationService: TranslationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.language = this.translationService.getSelectedLanguage();
  }

  plus(e) {
    // this.counter = e;
    this.changeQTY.emit(e);
  }

  minus(e) {
    // this.counter = e;
    this.changeQTY.emit(e);
  }

  remove(e, productID) {
    let isExecuted = confirm(this.translateService.instant("Are you sure you want to remove this item?"));
    if (isExecuted) {
      this.removeEmiter.emit(true);
      // console.log("delete it", productID);
    }
  }

  getPrice() {
    if (this.product && this.product.selection) return this.product.selection.price;
    return this.product.data.price;
  }

}
