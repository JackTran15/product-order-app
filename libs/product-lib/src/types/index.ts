import { z } from "zod";

export enum Company {
    AMAZON = 'Amazon',
    FACEBOOK = 'Facebook',
    MICROSOFT = 'Microsoft',
}
export const ZCompanyEnum = z.nativeEnum(Company)

export type Product = z.infer<typeof Product>
export const Product = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number().min(0),
})

export const CheckoutItem = Product.merge(z.object({ quantities: z.number().min(1) }))
export type CheckoutItem = z.infer<typeof CheckoutItem>

export type ListProductsInCart = Array<CheckoutItem>;


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