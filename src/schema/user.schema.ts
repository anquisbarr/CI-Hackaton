import z from 'zod'

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

export const CreateUserOutputSchema = z.object({
    name: z.string(),
    email: z.string().email(),
})

export type CreateUserInput = z.TypeOf<typeof createUserSchema>

export const requestOtpSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    redirect: z.string().default("/"),
})

export type requestOtpInput = z.TypeOf<typeof requestOtpSchema>

export const verifyOtpSchema = z.object({
    hash: z.string(),
})