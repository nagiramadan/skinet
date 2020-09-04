import { OrdersService } from './../orders.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: IOrder;

  constructor(private orderService: OrdersService, private bcService: BreadcrumbService, private route: ActivatedRoute) {
    bcService.set('@orderDetails', '');
  }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.orderService.getById(id).subscribe(o => {
      this.order = o;
      this.bcService.set('@orderDetails', '# ' + o.id);
    });
  }

}
