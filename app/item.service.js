"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var mock_items_1 = require('./mock-items');
var mock_promo_1 = require('./mock-promo');
var ItemService = (function () {
    function ItemService() {
    }
    ItemService.prototype.getTotalItemsAmount = function () {
        return Promise.resolve(mock_items_1.ITEMS.length);
    };
    ItemService.prototype.getTotalPrice = function () {
        var totalPrice = 0;
        //якщо в корзині є елемент з ціною більше 1 мілярда, 
        //то інші продукти даруються користувачу безкоштовно
        //для нашого магазину це вигодно, окскільки мінімальна ціна типу B(мільярд ) = 5 мільярдів
        for (var index = 0; index < mock_items_1.ITEMS.length; index++) {
            var element = mock_items_1.ITEMS[index];
            if (this.isTypeB()) {
                if (element.priceType == "B") {
                    totalPrice += element.amount * element.price;
                }
            }
            else
                totalPrice += element.amount * element.price;
        }
        return Promise.resolve(totalPrice);
    };
    ItemService.prototype.isTypeB = function () {
        for (var index = 0; index < mock_items_1.ITEMS.length; index++) {
            var element = mock_items_1.ITEMS[index];
            if (element.priceType == "B")
                return true;
        }
        return false;
    };
    ItemService.prototype.getDiscount = function (promo, price) {
        var disc = 0;
        for (var index = 0; index < mock_promo_1.PROMO.length; index++) {
            var code = mock_promo_1.PROMO[index];
            if (this.checkEquality(promo, code)) {
                switch (code.type) {
                    case "%":
                        if (price * (code.discount / 100) < price)
                            disc = price * (code.discount / 100);
                        else
                            disc = 0;
                        break;
                    case "$":
                        if (code.discount < price) {
                            disc = code.discount;
                        }
                        else
                            disc = 0;
                        break;
                }
            }
        }
        return Promise.resolve(disc);
    };
    ItemService.prototype.checkEquality = function (promo, some) {
        return promo.shortname == some.shortname && promo.discount == some.discount && promo.type == some.type;
    };
    ItemService.prototype.getItems = function () {
        return Promise.resolve(mock_items_1.ITEMS);
    };
    ItemService.prototype.getPromo = function () {
        return Promise.resolve(mock_promo_1.PROMO);
    };
    ItemService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map