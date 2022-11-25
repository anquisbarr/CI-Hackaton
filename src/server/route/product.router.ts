import {
  createProductSchema,
  getSingleProductSchema,
} from "../../schema/product.schema";
import { createRouter } from "../createRouter";
import * as trpc from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Product } from "@prisma/client";

export const productRouter = createRouter()
  .mutation("create", {
    input: createProductSchema,
    resolve: async ({ ctx, input }) => {
      if (!ctx.user) {
        new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a product",
        });
      }

      try {
        const product: Product = await ctx.prisma.product.create({
          data: {
            id: input.id,
            name: input.name,
            code: input.code,
            price: input.price,
            stock: input.stock,
            image: input.image,
            content: input.content,

            category: {
              connectOrCreate: {
                where: {
                  code: input.categoryCode,
                },
                create: {
                  code: 'XX',
                  name: 'XX',
                  content: 'Content for XX',
                },
              },
            },
          },
        });

        return product;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "Product already exists",
            });
          }
        }
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went very wrong :(",
        });
      }
    },
  })
  .query("products", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.product.findMany();
    },
  })
  .query("single-product", {
    input: getSingleProductSchema,
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.product.findUnique({
        where: {
          id: input.productId,
        },
      });
    },
  })
  .mutation("delete", {
    input: getSingleProductSchema,
    resolve: async ({ ctx, input }) => {
      if (!ctx.user) {
        new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to delete a product",
        });
      }
      try {
        const product = await ctx.prisma.product.delete({
          where: {
            id: input.productId,
          },
        });
        return product;
      } catch (e) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went very wrong :(",
        });
      }
    },
  });
