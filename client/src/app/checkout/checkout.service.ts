import { IOrderToCreate } from './../shared/models/order';
import { IDeliveryMethod } from './../shared/models/delivery-method';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getDeliveryMethods() {
    return this.http.get<IDeliveryMethod[]>(this.baseUrl + 'orders/deliveryMethods')
      .pipe(map(dm => {
        return dm.sort((a, b) => b.price - a.price);
      }));
  }

  createOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + 'orders', order);
  }

}
