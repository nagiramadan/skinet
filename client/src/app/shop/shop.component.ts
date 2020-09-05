import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from './../shared/models/product';
import { IPagination } from './../shared/models/pagination';
import { ShopParam } from './../shared/models/shop-param';
import { IProductType } from './../shared/models/product-type';
import { IBrand } from './../shared/models/brand';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IProductType[];
  shopParam: ShopParam;
  sortedOptions = [
    { name: 'Alphabetical', value: '' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];
  totalCount = 0;
  constructor(private shopService: ShopService) {
    this.shopParam = shopService.getShopParams();
  }

  ngOnInit() {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(userCache = false) {
    this.shopService.getProducts(userCache).subscribe(
      x => {
        this.products = x.data;
        this.totalCount = x.count;
      },
      error => console.log(error));
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
      x => this.brands = [{ id: 0, name: 'All' }, ...x],
      error => console.log(error));
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      x => this.types = [{ id: 0, name: 'All' }, ...x],
      error => console.log(error));
  }

  onBrandSelected(brandId: number) {
    this.shopParam.selectedBrandId = brandId;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParam.selectedTypeId = typeId;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParam.selectedSort = sort;
    this.getProducts();
  }

  onPageChanged(pageNumber: number) {
    if (this.shopParam.pageNumber !== pageNumber) {
      this.shopParam.pageNumber = pageNumber;
      this.getProducts(true);
    }
  }

  onReset() {
    this.shopParam = new ShopParam();
    this.shopService.setShopParams(this.shopParam);
    this.searchInput.nativeElement.value = '';
    this.getProducts();
  }

  onSearch() {
    this.shopParam.search = this.searchInput.nativeElement.value;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

}
