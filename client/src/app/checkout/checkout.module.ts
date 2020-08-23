import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule
  ],
  declarations: [CheckoutComponent],
  providers: []
})
export class CheckoutModule { }
