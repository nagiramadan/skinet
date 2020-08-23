import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  @Input() product: IProduct;
  constructor(private basketService: BasketService) { }

  addProductToBasket(product: IProduct) {
    this.basketService.addItem(product);
  }

}
