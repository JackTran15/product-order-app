import { Product, CheckoutItem, Company } from '@product-checkout-assigment/product-lib'
import { LOCAL_STORAGE_CART } from '../../constants/browser-storage'
import create from 'zustand'

import { Checkout } from '@product-checkout-assigment/product-lib'

export interface ListCartState {
    checkout: Checkout;
    add: (product: Product) => void;
    decrease: (id: string) => void;
    increase: (id: string) => void;
    remove: (id: string) => void;
    total: (company: Company | null) => number;
}

export const useCheckoutStore = create<ListCartState>((set, get) => ({
    checkout: new Checkout(JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART)) as CheckoutItem[] || []),

    add: (product) => get().checkout.add(product, (items: CheckoutItem[]) => {
        saveCart(items);
        set({ checkout: new Checkout(items) })
    }),

    decrease: (id: string) => get().checkout.decrease({ id }, (items: CheckoutItem[]) => {
        saveCart(items);
        set({ checkout: new Checkout(items) })
    }),

    increase: (id: string) => get().checkout.increase({ id }, (items: CheckoutItem[]) => {
        saveCart(items);
        set({ checkout: new Checkout(items) })
    }),

    remove: (id: string) => get().checkout.remove({ id }, (items: CheckoutItem[]) => {
        saveCart(items);
        set({ checkout: new Checkout(items) })
    }),

    total: (company = null) => get().checkout.total({ company }),
}));

function saveCart(items: CheckoutItem[]) {
    localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(items));
}
