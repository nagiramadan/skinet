import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BasketRoutingModule
  ],
  declarations: [BasketComponent],
})
export class BasketModule { }
