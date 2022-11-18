import { CartItem, Product, SpecialRule, ZCompanyEnum } from '../types'
import { listSpecialRules } from '../seeds';
import {
    CheckoutActionsCallback,
    IncreaseCartItemQuantitiesParams,
    DecreaseCartItemQuantitiesParams,
    RemoveCartItemQuantitiesParams,
    GetTotalParams
} from './schemaTypes';


export class Checkout {
    cartItems: CartItem[]

    constructor(cartItems: CartItem[] = []) {
        this.cartItems = cartItems
    };

    /**
     * Add 1 product to cart
     * @param cartItem  CartItem
     * @return void
     */
    add(product: Product, callback: CheckoutActionsCallback = () => { }): any {
        // check is this product id has been exists already in cart products list
        const itemIndex = this.cartItems.findIndex((cartItem) => cartItem.id == product.id);

        // whether it's not exists => append new cartItem
        if (itemIndex == -1) {
            const cartItem: CartItem = {
                ...product,
                quantities: 1,
            }
            this.cartItems.push(cartItem);
            return callback(this.cartItems);
        }

        // if the product has been exists =>  increase the quantities of that product's cart Item
        this.increase({ id: product.id, num: 1 });
        return callback(this.cartItems);
    }

    /**
     * Increase quantities of 1 CartItem by its id
     * @param id        product/cartItem identity string
     * @param num       num of quantities that will be increased
     * @return void
     */
    increase({ id, num = 1 }: IncreaseCartItemQuantitiesParams, callback: CheckoutActionsCallback = () => { }) {
        const itemIndex = this.cartItems.findIndex((cartItem) => cartItem.id == id);
        if (itemIndex == -1) throw new Error('This item is no longer available');
        this.cartItems[itemIndex].quantities += num;
        return callback(this.cartItems);
    }

    /**
     * decrease quantities of 1 CartItem by its id
     * @param id        product/cartItem identity string
     * @param num       num of quantities that will be decrased
     * @param callback  any callback function
     * @return void
     */
    decrease(
        { id, num = 1 }: DecreaseCartItemQuantitiesParams,
        callback: CheckoutActionsCallback = () => { }
    ) {
        const itemIndex = this.cartItems.findIndex((cartItem) => cartItem.id == id);
        if (itemIndex == -1)
            throw new Error('This item is no longer available');

        // remove cart item completely if its quantites just have 1 left
        if (this.cartItems[itemIndex].quantities == 1)
            return this.remove({ id }, callback)

        if (this.cartItems[itemIndex].quantities < num)
            this.cartItems[itemIndex].quantities = 0;
        else
            this.cartItems[itemIndex].quantities -= num;

        return callback(this.cartItems)
    }

    /**
     * Remove 1 CartItem by its id
     * @param id        product/cartItem identity string
     * @param callback  any callback function
     * @return void
     */
    remove({ id }: RemoveCartItemQuantitiesParams, callback: CheckoutActionsCallback = () => { }) {
        const itemIndex = this.cartItems.findIndex((cartItem) => cartItem.id == id);
        if (itemIndex == -1) throw new Error('This item is no longer available');
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        return callback(this.cartItems)
    }


    /**
     * Each product will have several discount rules 
     * So, we're going to calculate the total price for each cart item (product - quantities pair)
     * Then sum them up
     * @param  specialRules list of discount rules for privilleged customers from companies
     * @param  company      customer's company
     * @return number   total money checkout
     */
    total({ specialRules = listSpecialRules, company = null }: GetTotalParams): number {
        return this.cartItems
            .map(item => {
                const productRules = specialRules
                    .filter(rule => rule.productId === item.id && (!rule.company || rule.company === company))
                    .sort((ruleA, ruleB) => ruleA.discountPercentage > ruleB.discountPercentage ? 1 : -1);

                // if there is no applicable rules => normal total prices calculation
                if (!productRules.length) return item.price * item.quantities;

                // choose the best discount rule for customer
                const applicableRule = productRules[0];

                // counting num of product's quantities that can be discounted according to rule's config
                const discountedQuantites = item.quantities - item.quantities % applicableRule.minimumDiscountQuantities;

                // sum up the discounted price of discountable quantities
                const discountedPrice = discountedQuantites * item.price * (100 - applicableRule.discountPercentage) / 100;

                // sum up undiscounted price (normal price) of other product's quantities left
                const unDiscountedPrice = (item.quantities - discountedQuantites) * item.price;

                return discountedPrice + unDiscountedPrice;
            })
            .reduce((total: number, totalPrice: number) => total + totalPrice, 0);
    }
}