import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { LocalStorage as ls } from 'src/app/utils/localstorage.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  cart: any = {
    price: 0,
    qty: 0
  };
  products: any = [];
  // products: any = [
  //   {
  //     id: 1,
  //     title_ar: '1 Kilo Meat Mansaf',
  //     title_en: '1 Kilo Meat Mansaf',
  //     desc1_en: '3 pieces of meat (each piece weighs 350 grams)',
  //     desc2_en: 'Click to choose weight/pr',
  //     desc1_ar: '3 pieces of meat (each piece weighs 350 grams)',
  //     desc2_ar: 'Click to choose weight/pr',
  //     price: 23.430,
  //     image: 'https://cdn.shopgo.me/20210912-store-3tnh/products/14427436/93366593.jpg?width=192',
  //     category: 1
  //   },
  //   {
  //     id: 1,
  //     title_ar: '1 Kilo Meat Mansaf',
  //     title_en: '1 Kilo Meat Mansaf',
  //     desc1_en: '3 pieces of meat (each piece weighs 350 grams)',
  //     desc2_en: 'Click to choose weight/pr',
  //     desc1_ar: '3 pieces of meat (each piece weighs 350 grams)',
  //     desc2_ar: 'Click to choose weight/pr',
  //     price: 23.00,
  //     image: 'https://cdn.shopgo.me/20210912-store-3tnh/products/14427436/93366593.jpg?width=192',
  //     category: 1
  //   }
  // ];
  constructor(
    private sharedService: SharedService,
    private cdk: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.products = ls.getValue("basket") || [];
    this.updateCartView();
  }

  remove(index) {
    this.products = this.sharedService.removeFromArrayByIndex(this.products, index);
    this.updateStoreData();
    if (this.products.length == 0) this.sharedService.redirectTo("/");
  }

  changeQTY(qty, index) {
    this.products[index].counter = qty;
    this.updateStoreData();
  }

  updateStoreData() {
    ls.setValue("basket", this.products);
    this.updateCartView();
  }

  updateCartView() {
    let basket = this.products;
    let totalPrice = 0;
    let totalCounter = 0;
    for (let index = 0; index < basket.length; index++) {
      let price = basket[index].selection && basket[index].selection.price ? basket[index].selection.price : basket[index].data.price;
      let counter = basket[index].counter;
      totalPrice += (+price * +counter);
      totalCounter += +counter;
    }
    this.cart = {
      price: totalPrice,
      qty: totalCounter
    };
    this.cdk.detectChanges();
  }

}
