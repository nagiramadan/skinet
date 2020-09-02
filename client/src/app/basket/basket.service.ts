import { IProduct } from 'src/app/shared/models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { IBasket, Basket, IBasketItem, IBasketTotals } from './../shared/models/basket';
import { map } from 'rxjs/operators';
import { IDeliveryMethod } from '../shared/models/delivery-method';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  shipping = 0;

  private basketTotalsSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotals$ = this.basketTotalsSource.asObservable();

  constructor(private http: HttpClient) { }

  setShippingPrice(deliverMethod: IDeliveryMethod) {
    this.shipping = deliverMethod.price;
    this.calculateTotals();
  }

  get(basketId: string) {
    let params = new HttpParams();
    params = params.append('id', basketId);
    return this.http.get<IBasket>(this.baseUrl + 'basket', { params })
      .pipe(map(x => {
        this.basketSource.next(x);
        this.calculateTotals();
        return x;
      }));
  }

  addItem(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasktValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd);
    this.set(basket);
  }

  increamentItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasktValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.set(basket);
  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasktValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.set(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasktValue();
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
      if (basket.items.length > 0) {
        this.set(basket);
      } else {
        this.delete(basket.id);
      }
    }
  }

  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.basketTotalsSource.next(null);
    localStorage.removeItem('basket-id');
  }

  getCurrentBasktValue() {
    return this.basketSource.value;
  }


  private set(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe(x => {
      this.basketSource.next(x);
      this.calculateTotals();
    }, error => console.log(error));
  }

  private delete(basketId: string) {
    const params = new HttpParams();
    params.append('id', basketId);
    return this.http.delete<boolean>(this.baseUrl + 'basket', { params })
      .subscribe(() => {
        this.basketSource.next(null);
        this.basketTotalsSource.next(null);
        localStorage.removeItem('basket_id');
      }, error => console.log(error));
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      items.push(itemToAdd);
    } else {
      items[index].quantity += itemToAdd.quantity;
    }
    return items;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      brand: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      productName: item.name,
      type: item.productType,
      quantity
    };
  }

  private calculateTotals() {
    const basket = this.getCurrentBasktValue();
    const shipping = this.shipping;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalsSource.next({ shipping, total, subtotal });
  }
}
