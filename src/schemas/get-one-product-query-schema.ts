import z from "zod";

export const getRelatedProductsQuerySchema = z.object({
    limit: z.string().regex(/^\d+$/).optional()
});