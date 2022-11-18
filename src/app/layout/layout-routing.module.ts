import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmPhoneComponent } from './components/confirm-phone/confirm-phone.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SiteContentComponent } from './components/site-content/site-content.component';
// import { AuthGuard } from '../utils/auth.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: '', component: DashboardComponent },
      // { path: 'dashboard', component: DashboardComponent },      
      { path: 'privacy-policy', component: SiteContentComponent },
      { path: 'terms-and-conditions', component: SiteContentComponent },
      { path: 'product/:ID', component: ProductDetailsComponent },
      { path: 'basket', component: BasketComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'confirm-phone/:ID', component: ConfirmPhoneComponent },
      { path: 'confirmation', component: ConfirmationComponent },
      { path: '**', redirectTo: '/dashboard' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
