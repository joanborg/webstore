import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object("/shopping-carts/" + cartId);
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem("cartId");
    if(!cartId) {
        let res = await this.create();
        localStorage.setItem("cartId", res.key);
        return this.getCart(res.key);
    }
    return this.getCart(cartId);
  }
}
