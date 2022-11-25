import z from "zod";

export const createProductOrderSchema = z.object({
    productId: z.string(),
    quantity: z.number(),
});

export type CreateProductOrderInput = z.TypeOf<typeof createProductOrderSchema>

export const updateProductOrderSchema = z.object({
    orderId: z.string().uuid(),
    status: z.enum(['PENDING', 'CONFIRMED', 'ACTIVE', 'DELIVERED']),
});

export type UpdateProductOrderInput = z.TypeOf<typeof updateProductOrderSchema>

export const createOrderSchema = z.object({
    productOrders: z.array(createProductOrderSchema),
});

export type CreateOrderInput = z.TypeOf<typeof createOrderSchema>