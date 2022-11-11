import { createCategorySchema } from "../../schema/category.schema";
import { createRouter } from "../createRouter";
import * as trpc from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export const categoryRouter = createRouter()
  .mutation("create", {
    input: createCategorySchema,
    resolve: async ({ ctx, input }) => {
      if (!ctx.user) {
        new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a category",
        });
      }

      try {
        const category = await ctx.prisma.category.create({
          data: {
              ...input,
          },});
  
        return category;
        
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "Category already exists",
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
  .query("all", {
    resolve: async ({ ctx }) => {
      return ctx.prisma.category.findMany();
    },
  });
