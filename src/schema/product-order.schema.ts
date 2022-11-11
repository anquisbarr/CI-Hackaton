import z from "zod";

export const createProductOrderSchema = z.object({
    quantity: z.string(),
    productId: z.string().uuid(),
});

export type CreateProductOrderInput = z.TypeOf<typeof createProductOrderSchema>

export const updateProductOrderSchema = z.object({
    orderId: z.string().uuid(),
    status: z.enum(['PENDING', 'CONFIRMED', 'ACTIVE', 'DELIVERED']),
});

export type UpdateProductOrderInput = z.TypeOf<typeof updateProductOrderSchema>