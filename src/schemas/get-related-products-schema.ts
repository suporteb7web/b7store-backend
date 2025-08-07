import z from "zod";

export const getRelatedProductsSchema = z.object({
    id: z.string().regex(/^\d+$/)
});