import { createRouter } from "../createRouter";
import { userRouter } from "./user.router";
import { categoryRouter } from "./category.router";
import { productRouter } from "./product.router";
import { orderRouter } from "./order.router"

export const appRouter = createRouter()
    .merge('users.', userRouter)
    .merge('categories.', categoryRouter)
    .merge('products.', productRouter)
    .merge('orders.',orderRouter)

export type AppRouter = typeof appRouter;