import z from 'zod';

// TODO: fix price and stock to be numbers, code forced.

export const createProductSchema = z.object({
    id: z.string(),
    code: z.string().max(5),
    name: z.string().max(150,'Max 150 characters'),
    price: z.number(),
    stock: z.string(),
    image: z.string().url(),
    content: z.string().min(10),
    categoryCode: z.string(),
})

export type CreateProductInput = z.TypeOf<typeof createProductSchema>

export const getSingleProductSchema = z.object({
    productId: z.string(),
})

export type GetSingleProductInput = z.TypeOf<typeof getSingleProductSchema>