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
var cart_icon_service_1 = require('./cart-icon.service');
var item_service_1 = require('./item.service');
var CartIconComponent = (function () {
    function CartIconComponent(cartService, itemService) {
        this.cartService = cartService;
        this.itemService = itemService;
    }
    CartIconComponent.prototype.getAmountOfItems = function (items) {
        var _this = this;
        this.cartService.getTotalItemsAmount(items).then(function (totalItems) { return _this.totalItemsAmount = totalItems; });
        return this.totalItemsAmount;
    };
    CartIconComponent.prototype.getItems = function () {
        return this.cartService.getItems();
    };
    CartIconComponent.prototype.ngOnInit = function () {
        //this.getAmountOfItems(this.getItems());
    };
    CartIconComponent = __decorate([
        core_1.Component({
            selector: 'cart-amount',
            template: "<span  ([ngModel])=\"totalItemsAmount\" class=\"badge\" style=\"visibility: visible;\" >{{totalItemsAmount}}</span>"
        }), 
        __metadata('design:paramtypes', [cart_icon_service_1.CartService, item_service_1.ItemService])
    ], CartIconComponent);
    return CartIconComponent;
}());
exports.CartIconComponent = CartIconComponent;
//# sourceMappingURL=cart-icon.component.js.map