import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    ShopRoutingModule
  ],
  declarations: [ShopComponent, ProductItemComponent, ProductDetailsComponent]
})
export class ShopModule { }
