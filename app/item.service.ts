import { Injectable } from '@angular/core'
import { ITEMS } from './mock-items'
import { PROMO } from './mock-promo'
import { Promo } from './promo';

@Injectable()
export class ItemService{
    getTotalItemsAmount(){
        return Promise.resolve(ITEMS.length);
    }
    getTotalPrice(){
        var totalPrice=0;
        //якщо в корзині є елемент з ціною більше 1 мілярда, 
        //то інші продукти даруються користувачу безкоштовно
        //для нашого магазину це вигодно, окскільки мінімальна ціна типу B(мільярд ) = 5 мільярдів
        for (var index = 0; index < ITEMS.length; index++) {
            var element = ITEMS[index];
            if(this.isTypeB()){
                 if(element.priceType=="B")
                 {
                     totalPrice += element.amount * element.price;
                 } 
            }
            else
                totalPrice += element.amount * element.price;
        }
        return Promise.resolve(totalPrice);
    }
    isTypeB(){
        for (var index = 0; index < ITEMS.length; index++) {
            var element = ITEMS[index];
            if(element.priceType=="B")
                return true;
        }
        return false;
    }
    getDiscount( promo:Promo, price:number ){
        var disc=0;
        for ( var index = 0; index < PROMO.length; index++ ){
            var code = PROMO[index];
            if( this.checkEquality(promo, code) )
            {
                switch(code.type){
                    case "%":
                         if( price*(code.discount/100) < price )
                            disc=price*(code.discount/100);     
                        else    
                            disc = 0;
                         break;
                    case "$":
                        if(code.discount < price){
                            disc=code.discount;
                        }
                        else
                            disc = 0;
                        break;
                }          
            }
        }
        return Promise.resolve(disc);
    }
    checkEquality(promo:Promo, some:Promo){
        return promo.shortname==some.shortname && promo.discount==some.discount && promo.type==some.type; 
    }
    getItems(){
        return Promise.resolve( ITEMS );
    }
    getPromo(){
        return Promise.resolve( PROMO );
    }
}