import z from 'zod';

export const createPostSchema = z.object({
    title: z.string().max(256,'Max 256 characters'),
    content: z.string().min(10),
})

export type CreatePostInput = z.TypeOf<typeof createPostSchema>

export const getSinglePostSchema = z.object({
    postId: z.string().uuid(),
})