import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  constructor(private fb: FormBuilder, private accountService: AccountService,
              private basketService: BasketService) { }

  ngOnInit() {
    this.createCheckOutForm();
    this.getAddressFormValues();
    this.getDeliveryMethodValue();
  }

  createCheckOutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    });
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe(address => {
      if (address) {
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    });
  }

  getDeliveryMethodValue() {
    const basket = this.basketService.getCurrentBasktValue();
    if (basket.deliveryMethodId) {
      this.checkoutForm.get('deliveryForm').get('deliveryMethod').setValue(basket.deliveryMethodId.toString());
    }
  }

}
