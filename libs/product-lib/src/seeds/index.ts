import { Company, Product, SpecialRule } from './../types';

const PRODUCT_IDS = ['BoicUtBoERoz32Yh1fcKcMSS', '5bfACMAnZN0wQIUfLl4Ytbqf', '2RHSdKwPlFR05BZ2_AeyHJz9'];
const SPECIAL_RULES_IDS = ['wMEl6DYW6-PLlyydnPkOJ5GA', 'JTd7IE1yLz3j_AgZeiwZYqJU', 'DdkN1FMJozZvoemg6qWLu35T'];

export const listSeedProducts: Product[] = [
    {
        id: PRODUCT_IDS[0],
        name: 'Small Pizza',
        description: "10'' pizza for one person",
        price: 11.99,
    },
    {
        id: PRODUCT_IDS[1],
        name: 'Medium Pizza',
        description: "12'' pizza for two person",
        price: 15.99,
    },
    {
        id: PRODUCT_IDS[2],
        name: 'Large Pizza',
        description: "15'' pizza for four person",
        price: 21.99,
    },
];

export const listSpecialRules: Array<SpecialRule> = [
    {
        id: SPECIAL_RULES_IDS[0],
        company: Company.MICROSOFT,
        productId: PRODUCT_IDS[0],
        minimumDiscountQuantities: 3,
        discountPercentage: 33.33, // %
    },
    {
        id: SPECIAL_RULES_IDS[1],
        company: Company.AMAZON,
        productId: PRODUCT_IDS[2],
        minimumDiscountQuantities: 1,
        discountPercentage: 9.095,
    },
    {
        id: SPECIAL_RULES_IDS[2],
        company: Company.FACEBOOK,
        productId: PRODUCT_IDS[1],
        minimumDiscountQuantities: 5,
        discountPercentage: 20,
    },
]


