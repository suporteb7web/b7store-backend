import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(4)
});