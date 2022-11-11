import z from "zod";

export const createCategorySchema = z.object({
    code: z.string().max(2),
    name: z.string().max(50, "Max 50 characters"),
    content: z.string().min(10),    
})

export type CreateCategoryInput = z.TypeOf<typeof createCategorySchema>

export const deleteCategorySchema = z.object({
    productId: z.string().uuid()
})

export type DeleteCategoryInput = z.TypeOf<typeof deleteCategorySchema>