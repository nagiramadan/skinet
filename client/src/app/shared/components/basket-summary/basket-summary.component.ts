import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  basket$: Observable<IBasket>;
  @Input() isBasket = true;
  @Output() decrement = new EventEmitter<IBasketItem>();
  @Output() increment = new EventEmitter<IBasketItem>();
  @Output() remove = new EventEmitter<IBasketItem>();

  constructor(private basketSerivce: BasketService) { }

  ngOnInit() {
    this.basket$ = this.basketSerivce.basket$;
  }

  decrementItemQuantity(item: IBasketItem) {
    this.decrement.emit(item);
  }

  incrementItemQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }

  removeItemQuantity(item: IBasketItem) {
    this.remove.emit(item);
  }

}
