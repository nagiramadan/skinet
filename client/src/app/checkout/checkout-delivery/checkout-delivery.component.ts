import { IDeliveryMethod } from './../../shared/models/delivery-method';
import { CheckoutService } from './../checkout.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {

  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

  constructor(private checkoutService: CheckoutService, private basketServce: BasketService) { }

  ngOnInit() {
    this.checkoutService.getDeliveryMethods().subscribe(dm => this.deliveryMethods = dm);
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.basketServce.setShippingPrice(deliveryMethod);
  }

}
