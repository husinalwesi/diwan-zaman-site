import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, ChangeDetectorRef, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TranslationService } from './i18n/translation.service';
import { locale as enLang } from './i18n/vocabs/en';
import { locale as arLang } from './i18n/vocabs/ar';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from './shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService as translateS } from 'src/app/i18n/translation.service';
import { LocalStorage as ls } from 'src/app/utils/localstorage.service';
import { ApiService } from './shared/services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements OnInit, OnDestroy {
  cart: any = {
    price: 0,
    qty: 0
  };
  buttonType: string = "view";
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  showFlag: boolean = false;
  imageObject: Array<object> = [];

  constructor(
    private translationService: TranslationService,
    private router: Router,
    private sharedService: SharedService,
    private translate: TranslateService,
    private translateS: translateS,
    private cdk: ChangeDetectorRef,
    private apiService: ApiService
  ) {
    this.updateSharedData();
    // register translations
    this.translationService.loadTranslations(
      enLang,
      arLang
    );

    this.translate.use(this.translateS.getSelectedLanguage());
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkStatus();
        this.updateCartView();
      }
    });
  }

  ngOnInit() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.unsubscribe.push(routerSubscription);
    this.sharedService.setHtmlDirection(this.translationService.getSelectedLanguage());
    this.showFullScreenSubjectHandler();
    this.checkStatus();
    this.updateCartView();
  }

  updateSharedData() {
    this.apiService.getSharedData().subscribe(
      (success) => {
        this.sharedService.sharedData$.next(success.dataObject);
      }, (error) => {
        console.log(error);
      });
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
      this.sharedService.redirectTo("/");
    } else if (this.buttonType == "back") {
      this.sharedService.redirectTo("/");
    } else if (this.buttonType == "view") {
      this.sharedService.redirectTo("/basket");
    }
  }

  isShown() {
    return window.location.pathname != "/";
    // here....
    // return !(window.location.href.indexOf("/") !== -1);
    // return (
    //   window.location.href.indexOf("/product/") !== -1 ||
    //   window.location.href.indexOf("/product/") !== -1
    // )
  }

  whenToShowButton() {
    return (this.cart.qty > 0 && !(window.location.href.indexOf("/basket") !== -1) && !(window.location.href.indexOf("/checkout") !== -1) && !(window.location.href.indexOf("/confirmation") !== -1)) || window.location.href.indexOf("/product/") !== -1
  }

  showFullScreenSubjectHandler() {
    let _this = this;
    this.sharedService.imageFullView$.subscribe(event => {
      if (event) {
        _this.imageObject = [];
        _this.imageObject[0] = {
          image: event,
          thumbImage: event,
          title: ''
        };
        _this.showFlag = true;
        this.closeOutSidePhotoViewer();
        _this.cdk.detectChanges();
      }
    });
  }

  closeOutSidePhotoViewer() {
    let $this = this;
    setTimeout(() => {
      const toggleElements = document.querySelectorAll('.custom-image-main');
      toggleElements.forEach(el => {
        el.addEventListener('click', function (evt) {
          let tagName = evt["path"][0].tagName.toLowerCase();
          if (tagName != "img") {
            $this.showFlag = false;
          }
        });
      });
    });
  }

  hideFullScreen() {
    this.showFlag = false;
    this.sharedService.showImageFullView("");
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
