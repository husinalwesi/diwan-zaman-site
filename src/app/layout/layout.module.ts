import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SiteContentComponent } from './components/site-content/site-content.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BasketComponent } from './components/basket/basket.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmPhoneComponent } from './components/confirm-phone/confirm-phone.component';

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    SiteContentComponent,
    ProductDetailsComponent,
    BasketComponent,
    CheckoutComponent,
    ConfirmationComponent,
    ConfirmPhoneComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    TranslateModule,
    SharedModule,
    LazyLoadImageModule,
    NgbModule
  ],
  exports: [TranslateModule],
  providers: [DatePipe, TranslatePipe]
})
export class LayoutModule { }
