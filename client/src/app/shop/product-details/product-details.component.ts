import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from "xng-breadcrumb";
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from './../shop.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  quantity = 1;
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService,
    private basketService: BasketService) {
    this.bcService.set('@productDetails', '');
  }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    this.shopService.getProduct(+this.activatedRoute.snapshot.params['id']).subscribe(
      x => {
        this.product = x;
        this.bcService.set('@productDetails', this.product.name);
      },
      error => console.log(error)
    );
  }

  
  addProductToBasket(item: IBasketItem) {
    this.basketService.addItem(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity(item: IBasketItem) {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
