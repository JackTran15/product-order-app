import { z } from "zod";

export enum Company {
    AMAZON = 'Amazon',
    FACEBOOK = 'Facebook',
    MICROSOFT = 'Microsoft',
}
export const ZCompanyEnum = z.nativeEnum(Company)

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
};

export type CartItem = Product & {
    quantities: number;
    totalPrice?: number;
};

export type ListProductsInCart = Array<CartItem>;


export const SpecialRule = z.object({
    id: z.string(),
    company: ZCompanyEnum.nullable(),
    productId: z.string(),
    minimumDiscountQuantities: z.number(),
    discountPercentage: z.number(),
})

export type SpecialRule = {
    id: string;
    company: Company;
    productId: string;
    minimumDiscountQuantities: number;
    discountPercentage: number;
};