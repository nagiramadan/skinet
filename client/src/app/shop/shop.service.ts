import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IProduct } from '../shared/models/product';
import { IPagination } from '../shared/models/pagination';
import { IProductType } from '../shared/models/product-type';
import { IBrand } from '../shared/models/brand';
import { ShopParam } from '../shared/models/shop-param';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProducts(shopParam: ShopParam) {
    let params = new HttpParams();
    if(shopParam.selectedBrandId !== 0) {
      params = params.append('brandId', shopParam.selectedBrandId.toString());
    }
    if(shopParam.selectedTypeId !== 0) {
      params = params.append('typeId', shopParam.selectedTypeId.toString());
    }
    if(shopParam.search) {
      params = params.append('search', shopParam.search);
    }
    params = params.append('sort', shopParam.selectedSort);
    params = params.append('pageSize', shopParam.pageSize.toString());
    params = params.append('pageIndex', shopParam.pageNumber.toString());
    return this.http.get<IPagination<IProduct>>(this.baseUrl + 'products', { params: params });
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }

}
