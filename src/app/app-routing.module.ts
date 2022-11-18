import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './layout/components/basket/basket.component';
import { CheckoutComponent } from './layout/components/checkout/checkout.component';
import { ConfirmPhoneComponent } from './layout/components/confirm-phone/confirm-phone.component';
import { ConfirmationComponent } from './layout/components/confirmation/confirmation.component';
import { DashboardComponent } from './layout/components/dashboard/dashboard.component';
import { ProductDetailsComponent } from './layout/components/product-details/product-details.component';
import { SiteContentComponent } from './layout/components/site-content/site-content.component';

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard' },
  { path: '', component: DashboardComponent },
  { path: 'privacy-policy', component: SiteContentComponent },
  { path: 'terms-and-conditions', component: SiteContentComponent },
  { path: 'product/:ID', component: ProductDetailsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'confirm-phone/:ID', component: ConfirmPhoneComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**', redirectTo: '/' },
  // {
  //   path: '',
  //   children: [
  //     {
  //       path: 'layout',
  //       loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
  //     },
  //     // { path: '**', redirectTo: '/dashboard' },
  //   ]
  // }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
