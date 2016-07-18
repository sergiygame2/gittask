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
var item_service_1 = require('./item.service');
var cart_icon_service_1 = require('./cart-icon.service');
var ItemComponent = (function () {
    function ItemComponent(itemService, cartService) {
        this.itemService = itemService;
        this.cartService = cartService;
        this.discount = 0;
    }
    ItemComponent.prototype.getItems = function () {
        var _this = this;
        this.itemService.getItems().then(function (items) { return _this.items = items; });
    };
    ItemComponent.prototype.getDiscount = function () {
        var _this = this;
        if (this.convertToPromo())
            this.itemService.getDiscount(this.promoInstance, this.totalPrice).then(function (discount) { return _this.discount = discount; });
    };
    ItemComponent.prototype.convertToPromo = function () {
        var pattern = "^([a-z]+)([0-9]+)((\\%)|((\\$)))$";
        var regex = new RegExp(pattern);
        var match = regex.exec(this.promo);
        if (match) {
            this.promoInstance = { shortname: match[1], type: match[3], discount: parseInt(match[2]) };
            return 1;
        }
        this.discount = 0;
        return 0;
    };
    ItemComponent.prototype.getTotalPrice = function () {
        var _this = this;
        this.itemService.getTotalPrice().then(function (totalPrice) { return _this.totalPrice = totalPrice; });
    };
    ItemComponent.prototype.getTotalAmount = function () {
        var _this = this;
        this.cartService.getTotalItemsAmount(this.items).then(function (totalItems) { return _this.totalItems = totalItems; });
    };
    ItemComponent.prototype.checkForTypeB = function () {
        this.isTypeB = this.itemService.isTypeB();
    };
    ItemComponent.prototype.removeItem = function (item) {
        var _this = this;
        var index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
        this.getTotalAmount();
        this.getTotalPrice();
        this.checkForTypeB();
        if (this.convertToPromo())
            this.itemService.getDiscount(this.promoInstance, this.totalPrice - item.price).then(function (discount) { return _this.discount = discount; });
    };
    ItemComponent.prototype.decrement = function (item) {
        var _this = this;
        if (item.isAmountChangeable && item.amount > 1)
            item.amount--;
        this.getTotalAmount();
        this.getTotalPrice();
        if (this.convertToPromo())
            this.itemService.getDiscount(this.promoInstance, this.totalPrice - item.price).then(function (discount) { return _this.discount = discount; });
    };
    ItemComponent.prototype.increment = function (item) {
        var _this = this;
        if (item.isAmountChangeable)
            item.amount++;
        this.getTotalAmount();
        this.getTotalPrice();
        if (this.convertToPromo())
            this.itemService.getDiscount(this.promoInstance, this.totalPrice + item.price).then(function (discount) { return _this.discount = discount; });
    };
    ItemComponent.prototype.ngOnInit = function () {
        this.getItems();
        this.getTotalPrice();
        this.checkForTypeB();
        this.getTotalAmount();
    };
    ItemComponent = __decorate([
        core_1.Component({
            selector: 'my-item',
            templateUrl: 'app/item.component.html',
            styleUrls: ['app/item.component.css']
        }), 
        __metadata('design:paramtypes', [item_service_1.ItemService, cart_icon_service_1.CartService])
    ], ItemComponent);
    return ItemComponent;
}());
exports.ItemComponent = ItemComponent;
//# sourceMappingURL=item.component.js.map