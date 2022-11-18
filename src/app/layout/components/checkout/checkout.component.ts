import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { LocalStorage as ls } from 'src/app/utils/localstorage.service';
import { parse, stringify } from 'lossless-json'
import { PhoneComponent } from 'src/app/shared/components/phone/phone.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild(PhoneComponent) phone1: PhoneComponent;
  @ViewChild(PhoneComponent) phone2: PhoneComponent;

  selectedDeliveryMethod: string = "delivery";//direct//delivery
  time: {
    startTime: "",
    closeTime: ""
  };
  address: string = "";
  isSubmit: boolean = false;
  fullName: string = "";
  phone: string = "";
  cart: any = {
    price: 0,
    qty: 0
  };
  products: any = [];
  constructor(
    private sharedService: SharedService,
    private cdk: ChangeDetectorRef,
    private apiService: ApiService,
    private alert: AlertService,
    private translateService: TranslateService,
    private spinner: NgxSpinnerService,
  ) {
    this.updateSharedData();
  }

  ngOnInit(): void {
    this.getData();
  }

  updateSharedData() {
    this.apiService.getSharedData().subscribe(
      (success) => {
        this.sharedService.sharedData$.next(success.dataObject);
        this.time = {
          startTime: success.dataObject.startTime,
          closeTime: success.dataObject.closeTime
        }
        this.cdk.detectChanges();
      }, (error) => {
        console.log(error);
      });
  }

  getSharedData() {
    let _this = this;
    this.sharedService.sharedData$.subscribe(event => {
      // console.log(event);
      
      if (!this.sharedService.isEmpty(event)) {
        _this.time = {
          startTime: event.startTime,
          closeTime: event.closeTime
        }
        _this.cdk.detectChanges();
      }
    });
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

  phoneChange(e) {
    this.phone = e;
  }

  // sendMessage(confirmDigits, toPhone) {
  //   let data = {
  //     Body: this.translateService.instant("Verification number to confirm your order from Diwan Zaman " + confirmDigits),
  //     From: '+13855631514',
  //     To: toPhone
  //     // To: '+962781208820'
  //   };
  //   this.apiService.sendMessage(data).subscribe(
  //     (success) => {
  //       console.log(success);
  //     }, (error) => {
  //       console.log(error);
  //     });
  // }


  // getSharedData() {
  //   let _this = this;
  //   this.sharedService.sharedData$.subscribe(event => {
  //     if (!this.sharedService.isEmpty(event)) {
  //       _this.time = {
  //         startTime: event.startTime,
  //         closeTime: event.closeTime
  //       }
  //       _this.checkIsClosed();
  //       _this.cdk.detectChanges();
  //     }
  //   });
  // }

  isStoreClosed() {
    let cTime = new Date().getTime();
    // console.log(this.time);
    
    let startTimeArray: any = this.time.startTime.split(":");
    let closeTimeArray: any = this.time.closeTime.split(":");
    let start = new Date(new Date().setHours(startTimeArray[0], startTimeArray[1], 0, 0)).getTime();
    let end = new Date(new Date().setHours(closeTimeArray[0], closeTimeArray[1], 0, 0)).getTime();
    // 
    if (cTime > start && cTime < end) return false;
    else return true;
  }

  continue(form) {
    if (this.isStoreClosed()) {
      alert(this.translateService.instant("The store is closed"));
      return false;
    }
    this.isSubmit = true;
    let phone1 = this.phone1.getData();
    let phone2 = this.phone2.getData();
    if (form.valid && phone1.isvalid && phone2.isvalid) {
      this.spinner.show();
      let confirmDigits = Math.floor(1000 + Math.random() * 9000);
      // this.sendMessage(confirmDigits, phone1.phoneDetails.e164Number);

      let data = {
        customer_phone: stringify(phone1.phoneDetails),
        customer_phone2: stringify(phone2.phoneDetails),
        customer_address: this.address,
        customer_fullName: this.fullName,
        deliveryMethod: this.selectedDeliveryMethod,
        created_at: new Date().getTime(),
        status: 'pending',
        admin_responsible: '',
        change_status_at: '',
        products: stringify(ls.getValue("basket")),
        confirmDigits: confirmDigits,
        isPohneConfirmed: 0
      };

      let phonedata = {
        Body: this.translateService.instant("Verification number to confirm your order from Diwan Zaman" + " " + confirmDigits),
        From: '+13855631514',
        To: phone1.phoneDetails.e164Number
        // To: '+962781208820'
      };
      this.apiService.sendMessage(phonedata).subscribe(
        (success) => {


          this.apiService.createOrder(data).subscribe(
            (success) => {
              ls.removeValue("basket");
              this.sharedService.redirectTo(`/confirm-phone/${success.dataObject}`);
              this.spinner.hide();
            }, (error) => {
              this.spinner.hide();
              // this.alert.error({ title: error.error.message });
              // this.spinner.hide();
            });


        }, (error) => {

          this.apiService.createOrder(data).subscribe(
            (success) => {
              ls.removeValue("basket");
              this.sharedService.redirectTo("/confirmation");
              this.spinner.hide();
              // ls.removeValue("basket");
              // this.sharedService.redirectTo("/confirmation");
            }, (error) => {
              this.spinner.hide();
              // this.alert.error({ title: error.error.message });
              // this.spinner.hide();
            });


        });

    } else {
      this.alert.error({ title: 'PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
    }
  }

}
