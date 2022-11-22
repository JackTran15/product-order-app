import { CheckoutItem, Product } from '../types'
import { listSpecialRules } from '../seeds';
import {
    CheckoutActionsCallback,
    IncreaseCheckoutItemQuantitiesParams,
    DecreaseCheckoutItemQuantitiesParams,
    RemoveCheckoutItemQuantitiesParams,
    GetTotalParams
} from './dto';


export class Checkout {
    checkoutItems: CheckoutItem[]

    constructor(checkoutItems: CheckoutItem[] = []) {
        this.checkoutItems = checkoutItems
    };

    /**
     * Add 1 product to cart
     * @param product  Product
     * @return void
     */
    add(product: Product, callback: CheckoutActionsCallback = () => { }): any {
        // check is this product id has been exists already in cart products list
        product = Product.parse(product);

        const itemIndex = this.checkoutItems.findIndex((checkoutItem) => checkoutItem.id == product.id);

        // whether it's not exists => append new checkoutItem
        if (itemIndex == -1) {
            const checkoutItem: CheckoutItem = {
                ...product,
                quantities: 1,
            }

            this.checkoutItems.push(checkoutItem);
            return callback(this.checkoutItems);
        }

        // if the product has been exists =>  increase the quantities of that product's cart Item
        this.increase({ id: product.id, num: 1 });
        return callback(this.checkoutItems);

    }

    /**
     * Increase quantities of 1 CheckoutItem by its id
     * @param id        product/checkoutItem identity string
     * @param num       num of quantities that will be increased
     * @return void
     */
    increase(input: IncreaseCheckoutItemQuantitiesParams, callback: CheckoutActionsCallback = () => { }) {
        const { id, num } = IncreaseCheckoutItemQuantitiesParams.parse(input);

        const itemIndex = this.checkoutItems.findIndex((checkoutItem) => checkoutItem.id == id);
        if (itemIndex == -1) throw new Error('This item is no longer available');
        this.checkoutItems[itemIndex].quantities += num;
        return callback(this.checkoutItems);
    }

    /**
     * decrease quantities of 1 CheckoutItem by its id
     * @param id        product/checkoutItem identity string
     * @param num       num of quantities that will be decrased
     * @param callback  any callback function
     * @return void
     */
    decrease(
        input: DecreaseCheckoutItemQuantitiesParams,
        callback: CheckoutActionsCallback = () => { }
    ) {
        const { id, num } = IncreaseCheckoutItemQuantitiesParams.parse(input);

        const itemIndex = this.checkoutItems.findIndex((checkoutItem) => checkoutItem.id === id);

        if (itemIndex == -1)
            throw new Error('This item is no longer available');

        // remove cart item completely if its quantites just have 1 left
        if (this.checkoutItems[itemIndex].quantities == 1)
            return this.remove({ id }, callback)

        if (this.checkoutItems[itemIndex].quantities < num)
            this.checkoutItems[itemIndex].quantities = 0;
        else
            this.checkoutItems[itemIndex].quantities -= num;

        return callback(this.checkoutItems)
    }

    /**
     * Remove 1 CheckoutItem by its id
     * @param id        product/checkoutItem identity string
     * @param callback  any callback function
     * @return void
     */
    remove(input: RemoveCheckoutItemQuantitiesParams, callback: CheckoutActionsCallback = () => { }) {
        const { id } = RemoveCheckoutItemQuantitiesParams.parse(input);

        const itemIndex = this.checkoutItems.findIndex((checkoutItem) => checkoutItem.id == id);
        if (itemIndex == -1) throw new Error('This item is no longer available');
        this.checkoutItems = this.checkoutItems.filter(item => item.id !== id);
        return callback(this.checkoutItems)
    }


    /**
     * Each product will have several discount rules 
     * So, we're going to calculate the total price for each cart item (product - quantities pair)
     * Then sum them up
     * @param  specialRules list of discount rules for privilleged customers from companies
     * @param  company      customer's company
     * @return number   total money checkout
     */
    total(input: GetTotalParams): number {
        const { specialRules = listSpecialRules, company = null } = GetTotalParams.parse(input);

        return this.checkoutItems
            .map(item => {
                const productRules = specialRules
                    .filter(rule => rule.productId === item.id && (!rule.company || rule.company === company))
                    .sort((ruleA, ruleB) => ruleA.discountPercentage < ruleB.discountPercentage ? 1 : -1);

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