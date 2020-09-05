import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IProduct } from '../shared/models/product';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IProductType } from '../shared/models/product-type';
import { IBrand } from '../shared/models/brand';
import { ShopParam } from '../shared/models/shop-param';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = environment.apiUrl;
  // used for caching
  products: IProduct[] = []; // product in list the same as product by id
  brands: IBrand[] = [];
  types: IProductType[] = [];
  pagination = new Pagination<IProduct>();
  shopParam = new ShopParam();

  constructor(private http: HttpClient) { }

  getProducts(userCache: boolean) {
    if (!userCache) {
      this.products = [];
    }

    if (this.products.length > 0 && userCache) {
      const pagesReceived = Math.ceil(this.products.length / this.shopParam.pageSize);
      if (this.shopParam.pageNumber <= pagesReceived) {
        this.pagination.data = this.products.slice(
          (this.shopParam.pageNumber - 1) * this.shopParam.pageSize, this.shopParam.pageNumber * this.shopParam.pageSize);
        return of(this.pagination);
      }
    }

    let params = new HttpParams();
    if (this.shopParam.selectedBrandId !== 0) {
      params = params.append('brandId', this.shopParam.selectedBrandId.toString());
    }
    if (this.shopParam.selectedTypeId !== 0) {
      params = params.append('typeId', this.shopParam.selectedTypeId.toString());
    }
    if (this.shopParam.search) {
      params = params.append('search', this.shopParam.search);
    }
    params = params.append('sort', this.shopParam.selectedSort);
    params = params.append('pageSize', this.shopParam.pageSize.toString());
    params = params.append('pageIndex', this.shopParam.pageNumber.toString());
    return this.http.get<IPagination<IProduct>>(this.baseUrl + 'products', { params })
      .pipe(map(p => {
        this.products = [...this.products, ...p.data];
        this.pagination = p;
        return this.pagination;
      }));
  }

  setShopParams(params: ShopParam) {
    this.shopParam = params;
  }

  getShopParams() {
    return this.shopParam;
  }

  getProduct(id: number) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      return of(product);
    }
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    if (this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').pipe(map(b => {
      this.brands = b;
      return b;
    }));
  }

  getTypes() {
    if (this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types').pipe(map(t => {
      this.types = t;
      return t;
    }));
  }

}
