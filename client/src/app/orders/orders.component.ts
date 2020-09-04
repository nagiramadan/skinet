import { OrdersService } from './orders.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../shared/models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders$: Observable<IOrder[]>;
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.orders$ = this.orderService.getOrdersForUser();
  }

}
