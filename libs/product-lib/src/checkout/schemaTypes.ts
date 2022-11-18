import { z } from "zod"
import { SpecialRule, ZCompanyEnum, CartItem } from "../types"

export const IncreaseCartItemQuantitiesParams = z.object({
    id: z.string(),
    num: z.number().default(1)
})
export type IncreaseCartItemQuantitiesParams = z.infer<typeof IncreaseCartItemQuantitiesParams>

export const DecreaseCartItemQuantitiesParams = z.object({
    id: z.string(),
    num: z.number().default(1)
})
export type DecreaseCartItemQuantitiesParams = z.infer<typeof DecreaseCartItemQuantitiesParams>

export const RemoveCartItemQuantitiesParams = z.object({
    id: z.string(),
})
export type RemoveCartItemQuantitiesParams = z.infer<typeof RemoveCartItemQuantitiesParams>

export const GetTotalParams = z.object({
    specialRules: z.array(SpecialRule),
    company: ZCompanyEnum.nullable(),
})

export type GetTotalParams = z.infer<typeof GetTotalParams>

export type CheckoutActionsCallback = (cartItems: CartItem[]) => any;