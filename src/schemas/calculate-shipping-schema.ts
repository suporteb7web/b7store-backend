import z from "zod";

export const calculateShippingSchema = z.object({
    zipcode: z.string().min(4)
});