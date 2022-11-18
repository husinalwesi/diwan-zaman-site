import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../shared/services/shared.service';
import { LocalStorage as ls } from 'src/app/utils/localstorage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  cart: any = {
    price: 0,
    qty: 0
  };
  buttonType: string = "view";
  // @ViewChild('ruler') ruler: ElementRef;
  // @ViewChild('header') header: ElementRef;
  // headerSize: number = 1;
  // headerHeight: number = 1;
  // isSticky: boolean = false;
  constructor(
    private router: Router,
    private cdk: ChangeDetectorRef,
    private sharedService: SharedService,
    // private cdk: ChangeDetectorRef
  ) {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkStatus();
      }
    });
  }

  ngOnInit(): void {
    this.checkStatus();
    this.updateCartView();
    // this.getHeight();
    // this.checkSticky();
  }

  updateCartView() {
    let basket = ls.getValue("basket") || [];
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
    console.log({
      price: totalPrice,
      qty: totalCounter
    });
    
  }

  checkStatus() {
    if (window.location.href.indexOf("/product/") !== -1) {
      this.buttonType = "addToBasket";
    } else if (window.location.href.indexOf("/terms-and-conditions") !== -1 || window.location.href.indexOf("/privacy-policy") !== -1) {
      this.buttonType = "back";
    } else {
      this.buttonType = "view";
    }
    this.cdk.detectChanges();
  }

  submit() {
    if (this.buttonType == "addToBasket") {
      let newData = this.sharedService.product$.getValue();
      let basket = ls.getValue("basket");
      if (basket && basket.length > 0) {
        let isDataAlreadyInStore = !!basket.filter(item => +item.data.id == +newData.data.id).length;
        if (isDataAlreadyInStore) {
          let index = basket.findIndex(item => +item.data.id == +newData.data.id);
          basket[index] = newData;
          ls.setValue("basket", basket);
        } else {
          basket.push(newData);
          ls.setValue("basket", basket);
        }
      } else {
        ls.setValue("basket", [newData]);
      }
      this.updateCartView();
      this.sharedService.redirectTo("/dashboard");
    } else if (this.buttonType == "back") {
      this.sharedService.redirectTo("/dashboard");
    } else if (this.buttonType == "view") {
      this.sharedService.redirectTo("/basket");
    }
  }

  isShown() {
    return !(window.location.href.indexOf("/dashboard") !== -1);
    // return (
    //   window.location.href.indexOf("/product/") !== -1 ||
    //   window.location.href.indexOf("/product/") !== -1
    // )
  }

  whenToShowButton() {
    return (this.cart.qty > 0 && !(window.location.href.indexOf("/basket") !== -1) && !(window.location.href.indexOf("/checkout") !== -1) && !(window.location.href.indexOf("/confirmation") !== -1)) || window.location.href.indexOf("/product/") !== -1
  }

  // getHeight() {
  //   setTimeout(() => {
  //     this.headerSize = this.ruler.nativeElement.offsetWidth;
  //     this.headerHeight = this.header.nativeElement.offsetHeight;
  //     this.cdk.detectChanges();
  //   });
  // }

  // backdropClick() {
  //   this.sharedService.closeMobileMenu();
  // }

  // ngOnDestroy(): void {
  //   document.body.classList.remove("dashboard-layout");
  // }

  // checkSticky() {
  //   let _this = this;
  //   setTimeout(() => {
  //     _this.isSticky = window.pageYOffset > 12;
  //     _this.cdk.detectChanges();
  //   });
  // }

  // @HostListener('window:resize', ['$event']) onResize(event) {
  //   this.getHeight();
  // }

  // @HostListener('window:scroll', ['$event']) onWindowScroll(event) {
  //   this.checkSticky();
  // }

}
