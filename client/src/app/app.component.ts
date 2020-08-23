import { Component } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private basketService: BasketService) {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      basketService.get(basketId).subscribe(() => { });
    }
  }
}
