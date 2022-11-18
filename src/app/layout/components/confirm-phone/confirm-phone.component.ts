import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-confirm-phone',
  templateUrl: './confirm-phone.component.html',
  styleUrls: ['./confirm-phone.component.scss']
})
export class ConfirmPhoneComponent implements OnInit {
  phone1: string = "";
  phone2: string = "";
  phone3: string = "";
  phoneNum: string = "";
  phone4: string = "";
  id: string = "";
  @ViewChild('phone1Ele') phone1Ele: ElementRef;
  isSubmit: boolean = false;
  isError: boolean = false;

  constructor(
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private cdk: ChangeDetectorRef,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.id = this.route.snapshot.paramMap.get('ID');
    setTimeout(() => {
      this.phone1Ele.nativeElement.focus()
    });
    this.getOrderDetail();
  }

  getOrderDetail() {
    this.apiService.getOrderDetail(this.id).subscribe(
      (success) => {
        this.phoneNum = JSON.parse(success.dataObject.customer_phone).internationalNumber;
        this.cdk.detectChanges();
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        console.log(error);
      });
  }

  resendCode() {
    let confirmDigits = Math.floor(1000 + Math.random() * 9000);
    let data = {
      Body: this.translateService.instant("Verification number to confirm your order from Diwan Zaman " + confirmDigits),
      From: '+13855631514',
      To: this.phoneNum
      // To: '+962781208820'
    };
    this.apiService.sendMessage(data).subscribe(
      (success) => {

        this.apiService.updateOrder({ id: this.id, code: confirmDigits }).subscribe(
          (success) => {
            alert(this.translateService.instant("We've sent a new verification code to your phone number."));
          }, (error) => {
            console.log(error);
          });
      }, (error) => {
        console.log(error);
      });
  }

  submit() {
    this.isError = false;
    this.isSubmit = true;
    let code = this.phone1 + this.phone2 + this.phone3 + this.phone4;
    if (code.length == 4 && this.id) {

      this.apiService.checkOrderCode({ id: this.id, code: code }).subscribe(
        (success) => {
          if (success.dataObject) {
            this.apiService.confirmPhone({ id: this.id }).subscribe(
              (success) => {
                this.sharedService.redirectTo("/confirmation");
              }, (error) => {
                this.sharedService.redirectTo("/confirmation");
              });
          } else {
            this.isError = true;
            this.cdk.detectChanges();
          }
        }, (error) => {
          this.isError = true;
          this.cdk.detectChanges();
        });

    } else {
      this.isError = true;
      this.cdk.detectChanges();
    }
  }

}
