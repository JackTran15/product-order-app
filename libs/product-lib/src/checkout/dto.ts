import { z } from "zod"
import { SpecialRule, ZCompanyEnum, CheckoutItem } from "../types"

export const IncreaseCheckoutItemQuantitiesParams = z.object({
    id: z.string(),
    num: z.number().min(1).default(1)
})
export type IncreaseCheckoutItemQuantitiesParams = z.infer<typeof IncreaseCheckoutItemQuantitiesParams>

export const DecreaseCheckoutItemQuantitiesParams = z.object({
    id: z.string(),
    num: z.number().min(1).default(1)
})
export type DecreaseCheckoutItemQuantitiesParams = z.infer<typeof DecreaseCheckoutItemQuantitiesParams>

export const RemoveCheckoutItemQuantitiesParams = z.object({
    id: z.string(),
})
export type RemoveCheckoutItemQuantitiesParams = z.infer<typeof RemoveCheckoutItemQuantitiesParams>

export const GetTotalParams = z.object({
    specialRules: z.array(SpecialRule),
    company: ZCompanyEnum.nullable(),
})

export type GetTotalParams = z.infer<typeof GetTotalParams>

export type CheckoutActionsCallback = (checkoutItems: CheckoutItem[]) => any;