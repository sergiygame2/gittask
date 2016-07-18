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
var CartService = (function () {
    function CartService() {
    }
    CartService.prototype.getTotalItemsAmount = function (items) {
        if (!items)
            items = mock_items_1.ITEMS;
        var ta = 0;
        for (var index = 0; index < items.length; index++) {
            var element = items[index];
            ta += element.amount;
        }
        return Promise.resolve(ta);
    };
    CartService.prototype.getItems = function () {
        return mock_items_1.ITEMS;
    };
    CartService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;
//# sourceMappingURL=cart-icon.service.js.map