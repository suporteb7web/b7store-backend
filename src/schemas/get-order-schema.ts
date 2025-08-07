import z from "zod";

export const getOrderSchema = z.object({
    id: z.string().regex(/^\d+$/)
});