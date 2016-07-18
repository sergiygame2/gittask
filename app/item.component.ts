import { Component } from '@angular/core';
import { Item } from './item';
import { Promo } from './promo';
import { OnInit } from '@angular/core';
import { ItemService } from './item.service';
import { CartService } from './cart-icon.service';


@Component({
  selector: 'my-item',
  templateUrl:'app/item.component.html',
  styleUrls: ['app/item.component.css']
})

export class ItemComponent implements OnInit {
  items: Item[];
  totalPrice:number;
  isTypeB:boolean;
  totalItems:number;
  promo:string;
  discount:number = 0;
  promoInstance:Promo;


  constructor(private itemService: ItemService, private cartService: CartService) { }

  getItems() {
    this.itemService.getItems().then(items => this.items = items);
  }
  getDiscount(){
    if(this.convertToPromo())
      this.itemService.getDiscount(this.promoInstance, this.totalPrice).then( discount => this.discount = discount );
  }
  convertToPromo(){
      var pattern = "^([a-z]+)([0-9]+)((\\%)|((\\$)))$";	
	    var regex = new RegExp(pattern);
      var match = regex.exec(this.promo);
      if(match){
        this.promoInstance={ shortname: match[1], type: match[3], discount: parseInt(match[2]) };
        return 1;
      }
      this.discount = 0;
      return 0;
  }
  getTotalPrice(){
      this.itemService.getTotalPrice().then( totalPrice => this.totalPrice = totalPrice );
  }
  getTotalAmount(){
      this.cartService.getTotalItemsAmount(this.items).then(totalItems => this.totalItems = totalItems);
  }
  checkForTypeB(){
      this.isTypeB = this.itemService.isTypeB();
  }
  removeItem(item:Item){
      var index=this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index,1);
      }
    
    this.getTotalAmount();
    this.getTotalPrice();
    this.checkForTypeB();
    if(this.convertToPromo())
        this.itemService.getDiscount(this.promoInstance, this.totalPrice - item.price).then( discount => this.discount = discount );
  }
  decrement(item:Item){
      if( item.isAmountChangeable && item.amount>1 )
        item.amount--;

    this.getTotalAmount();
    this.getTotalPrice();
    if(this.convertToPromo())
        this.itemService.getDiscount(this.promoInstance, this.totalPrice - item.price).then( discount => this.discount = discount );
    
  }
  increment(item:Item){
      if( item.isAmountChangeable )
        item.amount++;

    this.getTotalAmount();
    this.getTotalPrice();
    if(this.convertToPromo())
        this.itemService.getDiscount(this.promoInstance, this.totalPrice + item.price).then( discount => this.discount = discount );
  
  }
  ngOnInit() {
    this.getItems();
    this.getTotalPrice();
    this.checkForTypeB();
    this.getTotalAmount();
  }
}
