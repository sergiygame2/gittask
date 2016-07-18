import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CartService } from './cart-icon.service';
import { ItemComponent } from './item.component';
import { ItemService } from './item.service';
import { Item } from './item';


@Component({
  selector: 'cart-amount',
  template:`<span  ([ngModel])="totalItemsAmount" class="badge" style="visibility: visible;" >{{totalItemsAmount}}</span>`
})
export class CartIconComponent implements OnInit {
    totalItemsAmount:number;
    
    constructor(private cartService: CartService, private itemService: ItemService) { }

    getAmountOfItems(items:Item[]){
      this.cartService.getTotalItemsAmount(items).then( totalItems => this.totalItemsAmount = totalItems);
      return this.totalItemsAmount;
    }
    getItems(){
      return this.cartService.getItems();
    }
    ngOnInit() {
      //this.getAmountOfItems(this.getItems());
  }
}
