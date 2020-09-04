import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

export const routes: Routes = [
    { path: '', component: OrdersComponent },
    { path: 'details/:id', component: OrderDetailsComponent, data: { breadcrumb: { alias: 'orderDetails' } } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule { }