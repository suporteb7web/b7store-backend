import z from "zod";

export const getOneProductSchema = z.object({
    id: z.string().regex(/^\d+$/)
});