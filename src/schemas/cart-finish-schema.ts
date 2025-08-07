import z from "zod";

export const cartFinishSchema = z.object({
    addressId: z.number().int(),
    cart: z.array(
        z.object({
            productId: z.number().int(),
            quantity: z.number().int().min(1)
        })
    ).nonempty()
});