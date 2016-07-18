import { Injectable } from '@angular/core'
import { ITEMS } from './mock-items'
import { Item } from './item'


@Injectable()
export class CartService{
    getTotalItemsAmount(items: Item[]){
        if(!items)
            items=ITEMS;
        var ta=0;
        for (var index = 0; index < items.length; index++) {
            var element = items[index];
            ta+=element.amount;
        }
        return Promise.resolve(ta);
    }
    getItems(){
        return ITEMS;
    }
}