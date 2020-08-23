import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotals } from './../../models/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  basketTotals$: Observable<IBasketTotals>;
  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basketTotals$ = this.basketService.basketTotals$;
  }

}
