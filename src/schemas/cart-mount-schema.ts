import z from "zod";

export const cartMountSchema = z.object({
    ids: z.array(z.number().int()).nonempty()
});