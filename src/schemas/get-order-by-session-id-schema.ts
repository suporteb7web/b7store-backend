import z from "zod";

export const getOrderBySessionIdSchema = z.object({
    session_id: z.string()
});