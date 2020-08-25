import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule  } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from "ngx-bootstrap/carousel";
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderSummaryComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent
  ],
  declarations: [PagingHeaderComponent, PagerComponent, OrderSummaryComponent, TextInputComponent]
})
export class SharedModule { }
