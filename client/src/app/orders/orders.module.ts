import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule
  ],
  declarations: [OrdersComponent, OrderDetailsComponent]
})
export class OrdersModule { }
