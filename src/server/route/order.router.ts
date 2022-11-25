import { createRouter } from "../createRouter";
import * as trpc from "@trpc/server";
import { createProductOrderSchema, CreateOrderInput, createOrderSchema} from "../../schema/product-order.schema";
import z from "zod";

export const orderRouter = createRouter()
    .mutation("createOrder", {
        input: createProductOrderSchema,
        resolve: async ({ ctx, input }) => {
            const { quantity, productId } = input;
            
            const user = await ctx.prisma.user.findUnique({
                where: {
                  email: ctx.user?.email,
                },
              });

            if (user === null) {
                throw new trpc.TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You must be logged in to create an order",
                });
            }

            const product: any = await ctx.prisma.product.findUnique({
                where: {
                    id: productId,
                },
            });

            if (product === null) {
                throw new trpc.TRPCError({
                    code: "NOT_FOUND",
                    message: "Product not found",
                });
            }

            var price: string = product.price.replace(",", ".");
            var priceNumber: number = parseFloat(price);
            var totalPrice: number = (priceNumber * quantity);
            console.log(product.price,price,priceNumber,totalPrice);

            try {
                const productOrder = await ctx.prisma.productsOnOrder.create({
                    data: {
                        quantity,
                        product: {
                            connect: {
                                id: product.id,
                            },
                        },
                        order: {
                                create: {
                                    total: totalPrice,
                                    user: {
                                        connect: {
                                            id: user.id,
                                        }
                                    }
                            },
                        },
                    },
                });
                return {
                    status: 201,
                    message: "Order created successfully",
                    data: productOrder,
                };
            } catch (e) {
                throw new trpc.TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Something went very wrong :(",
                });
            }

        }
    })
    .mutation('create-order', {
        input: createOrderSchema,
        resolve: async ({ ctx, input }) => {
            // create order
            const { productOrders } = input;
            const user = await ctx.prisma.user.findUnique({
                where: {
                  email: ctx.user?.email,
                },
              });
            if (user === null) {
                throw new trpc.TRPCError({
                    code: 'NOT_FOUND',
                    message: 'User not found',
                });
            }

            

            const total = productOrders.reduce((acc, cur) => {
                const product:any = ctx.prisma.product.findUnique({
                    where: {
                        id: cur.productId,
                    },
                });
                if (product === null) {
                    throw new trpc.TRPCError({
                        code: 'NOT_FOUND',
                        message: 'Product not found',
                    });
                }
                const price = product.price.replace(',', '.');
                const priceNumber = parseFloat(price);
                const totalPrice = priceNumber * cur.quantity;
                return acc + totalPrice;
            }, 0);

            console.log("productOrders", productOrders);
            console.log("total", total);

            const order = await ctx.prisma.order.create({
                data: {
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                    ProductsOnOrder: {
                        create: productOrders.map((productOrder) => ({
                            quantity: productOrder.quantity,
                            product: {
                                connect: {
                                    id: productOrder.productId,
                                },
                            },
                        })),
                    },
                    total,
                },
            });
            return order;
        }
    })
    .query('all', {
        resolve: async ({ ctx }) => {
            return await ctx.prisma.order.findMany();
        }
    }).mutation('update-status', {
        input: z.object({
            orderId: z.string().uuid(),
            status: z.enum(['PENDING', 'CONFIRMED', 'ACTIVE', 'DELIVERED']),
        }),
        resolve: async ({ ctx, input }) => {
            const { orderId, status } = input;
            const order = await ctx.prisma.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    status,
                },
            });
            return order;
        }
    });