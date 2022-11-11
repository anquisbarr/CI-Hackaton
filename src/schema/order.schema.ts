import z from "zod";

export const createOrderSchema = z.object({
    status: z.enum(["PENDING", "CONFIRMED", "ACTIVE", "DELIVERED"]),
    total: z.string(),
    userId: z.string().uuid(),
    products: z.array(z.string().uuid()),
});

export type CreateOrderInput = z.TypeOf<typeof createOrderSchema>;