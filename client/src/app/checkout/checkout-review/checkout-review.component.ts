import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {

  constructor(private basketService: BasketService) { }

  ngOnInit() {
  }

  createPaymentIntent() {
    this.basketService.createPaymentIntent().subscribe(() => {});
  }

}
