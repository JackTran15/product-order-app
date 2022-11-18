import { listSeedProducts, listSpecialRules } from '../seeds';
import { CartItem, Company, Product, SpecialRule } from '../types';
import { Checkout } from './index';

const cartItems: CartItem[] = [
    {
        id: '1',
        price: 1,
        name: 'Test 1',
        quantities: 1,
        description: 'Testing product'
    },
    {
        id: '2',
        price: 2,
        name: 'Test 2',
        quantities: 1,
        description: 'Testing product 2'
    }
]

const newProduct: Product = {
    id: '3',
    price: 3,
    name: 'New test item',
    description: 'Testing product 3'
}

describe('Checkout Module - Gerneral', () => {
    let checkout = new Checkout();

    beforeEach(() => {
        checkout = new Checkout(cartItems)
    })

    test('Should be defined', () => {
        expect(Checkout).toBeDefined();
        expect(checkout.add).toBeDefined();
        expect(checkout.increase).toBeDefined();
        expect(checkout.decrease).toBeDefined();
        expect(checkout.remove).toBeDefined();
        expect(checkout.cartItems).toBeDefined();
        expect(checkout.total).toBeDefined();
    });

    test('Constructor can initialize cart items', (done) => {
        expect(checkout.cartItems).toEqual(cartItems);
        done()
    })
});

describe('Checkout Module - Quantities Control', () => {
    let checkout = new Checkout();

    beforeEach(() => {
        checkout = new Checkout(cartItems)
    })

    test('Will increase quantities for existing product instead of create new cart item', (done) => {
        checkout.add(cartItems[0])
        expect(checkout.cartItems[0].quantities).toEqual(2);
        done()
    })

    test('Can increase num of quantities for 1 cart item in the same time', (done) => {
        checkout.increase({ id: cartItems[0].id, num: 1 });
        expect(checkout.cartItems[0].quantities).toEqual(3);

        checkout.increase({ id: cartItems[1].id, num: 2 });
        expect(checkout.cartItems[1].quantities).toEqual(3);
        done()
    })

    test('Will create new cart item with when new product appended', (done) => {
        checkout.add(newProduct)
        expect(checkout.cartItems.length).toEqual(3);
        expect(checkout.cartItems[2].name).toEqual(newProduct.name);
        expect(checkout.cartItems[2].id).toEqual(newProduct.id);
        expect(checkout.cartItems[2].price).toEqual(newProduct.price);
        expect(checkout.cartItems[2].quantities).toEqual(1);
        done()
    })

    test('Will decrease num of product quantities', (done) => {
        checkout.decrease({ id: cartItems[1].id, num: 2 })
        expect(checkout.cartItems[1].quantities).toEqual(1)

        checkout.decrease({ id: cartItems[0].id, num: 1 })
        expect(checkout.cartItems[0].quantities).toEqual(2)
        done()
    })

    test('Can remove a cart item by its Id', (done) => {
        checkout.remove({ id: cartItems[0].id })
        expect(checkout.cartItems.length).toEqual(2)
        expect(checkout.cartItems.find(item => item.id === cartItems[0].id)).toBeFalsy()
        done()
    })

    test('Will remove a cart item when decrease quantites with current quantities is 1', (done) => {
        checkout.decrease({ id: cartItems[1].id, num: 1 })
        expect(checkout.cartItems.length).toEqual(2)
        expect(checkout.cartItems.find(item => item.id === cartItems[1].id)).toBeFalsy()
        done()
    })
})

describe('Checkout Module - Pricing calculation', () => {
    let checkout = new Checkout();

    beforeEach(() => {
        return checkout = new Checkout();
    })

    test('Normal pricing calculation', (done) => {
        checkout.add(listSeedProducts[0])
        checkout.add(listSeedProducts[1])
        checkout.add(listSeedProducts[2])

        const expectTotal = listSeedProducts.reduce((total: number, product: Product) => product.price + total, 0)
        expect(checkout.total({ company: null, specialRules: [] })).toEqual(expectTotal);
        done()
    })

    test('Amazon staff can buy cheaper Large Pizza with right discount percentage', (done) => {
        const largePizza = listSeedProducts[2];
        const AmazonSpecialPricerule: SpecialRule = {
            productId: largePizza.id,
            company: Company.AMAZON,
            minimumDiscountQuantities: 1,
            discountPercentage: 20,
            id: 'sampleID'
        }

        checkout.add(largePizza)

        const total = checkout.total({ company: Company.AMAZON, specialRules: [AmazonSpecialPricerule] })

        expect(total).toBeLessThan(largePizza.price)
        expect(total.toFixed(2)).toEqual((largePizza.price * (100 - AmazonSpecialPricerule.discountPercentage) / 100).toFixed(2))
        done()
    })

    test('Microsoft - Gets a 3 for 2 deal for Small Pizzas', (done) => {
        const smallPizza = listSeedProducts[0];
        const specialRule: SpecialRule = listSpecialRules[0];

        checkout.add(smallPizza)
        checkout.add(smallPizza)
        checkout.add(smallPizza)

        const total = checkout.total({ company: Company.MICROSOFT, specialRules: [specialRule] })

        expect(total).toBeLessThan(smallPizza.price * 3)
        expect(total.toFixed(2)).toEqual((smallPizza.price * 2).toFixed(2))
        done()
    })

    test('Facebook - Gets a 5 for 4 deal on Medium Pizza', (done) => {
        const mediumPizza = listSeedProducts[1];
        const specialRule: SpecialRule = listSpecialRules[2];

        checkout.add(mediumPizza)
        checkout.add(mediumPizza)
        checkout.add(mediumPizza)
        checkout.add(mediumPizza)
        checkout.add(mediumPizza)

        const total = checkout.total({ company: Company.FACEBOOK, specialRules: [specialRule] })

        expect(total).toBeLessThan(mediumPizza.price * 5)
        expect(total.toFixed(2)).toEqual((mediumPizza.price * 4).toFixed(2))
        done()
    })

    test('Facebook - Gets a 5 for 4 deal on Medium Pizza | buy 7 pizzas', (done) => {
        const mediumPizza = listSeedProducts[1];
        const specialRule: SpecialRule = listSpecialRules[2];

        checkout.add(mediumPizza)
        checkout.add(mediumPizza)
        checkout.add(mediumPizza)
        checkout.add(mediumPizza)
        checkout.add(mediumPizza)
        checkout.add(mediumPizza)
        checkout.add(mediumPizza)

        const total = checkout.total({ company: Company.FACEBOOK, specialRules: [specialRule] })

        expect(total).toBeLessThan(mediumPizza.price * 7)
        expect(total.toFixed(2)).toEqual((mediumPizza.price * 4 + mediumPizza.price * 2).toFixed(2))
        done()
    })
})