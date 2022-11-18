import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { ViewFullImageDirective } from './directives/view-full-image.directive';
import { DefaultImgPipe } from './pipes/default-img.pipe';
import { ErrorImagePipe } from './pipes/error-image.pipe';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { FormatNumberPipe } from './pipes/format-number.pipe';
import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { CounterComponent } from './components/counter/counter.component';
import { PhoneComponent } from './components/phone/phone.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalComponent } from './components/modal/modal.component';
import { MoveNextByMaxLengthDirective } from './directives/move-next-by-max-length.directive';

@NgModule({
  declarations: [
    ViewFullImageDirective,
    DefaultImgPipe,
    ErrorImagePipe,
    FooterComponent,
    ProductComponent,
    FormatNumberPipe,
    ProductCartComponent,
    CounterComponent,
    PhoneComponent,
    LoaderComponent,
    ModalComponent,
    MoveNextByMaxLengthDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LazyLoadImageModule,
    Ng2TelInputModule,
    NgxIntlTelInputModule,
    Ng2IziToastModule,
    NgxSpinnerModule,
  ],
  exports: [
    TranslateModule,
    ViewFullImageDirective,
    DefaultImgPipe,
    ErrorImagePipe,
    LazyLoadImageModule,
    FooterComponent,
    ProductComponent,
    FormatNumberPipe,
    ProductCartComponent,
    CounterComponent,
    PhoneComponent,
    Ng2IziToastModule,
    LoaderComponent,
    NgxSpinnerModule,
    ModalComponent,
    MoveNextByMaxLengthDirective
  ],
})
export class SharedModule { }
