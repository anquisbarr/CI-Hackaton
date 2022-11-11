import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import { decode, encode } from "../../utils/base64";
import { baseURL } from "../../constants";
import {
  createUserSchema,
  requestOtpSchema,
  verifyOtpSchema,
} from "../../schema/user.schema";
import { sendLoginEmail } from "../../utils/mailer";
import { createRouter } from "../createRouter";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";
import { hash, verify } from "argon2";

export const userRouter = createRouter()
  .mutation("register-user", {
    input: createUserSchema,
    resolve: async ({ ctx, input }) => {
      const { name, email, password } = input;

      const hashedPassword = await hash(password);

      try {
        const user = await ctx.prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
        return {
          status: 201,
          message: "User created successfully",
          data: user.email,
        };
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "User already registered",
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
  .mutation("request-otp", {
    input: requestOtpSchema,
    resolve: async ({ ctx, input }) => {
      const { email, password, redirect } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      if (await verify(user.password, password)) {
        const token = await ctx.prisma.loginToken.create({
          data: {
            redirect,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });

        await sendLoginEmail({
          token: encode(`${token.id}:${user.email}`),
          url: baseURL,
          email: user.email,
        });
      } else {
        throw new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "Wrong password",
        });
      }
    },
  })
  .query("verify-otp", {
    input: verifyOtpSchema,
    resolve: async ({ ctx, input }) => {
      const decoded = decode(input.hash).split(":");
      const [id, email] = decoded;
      const token = await ctx.prisma.loginToken.findFirst({
        where: {
          id,
          user: {
            email,
          },
        },
        include: {
          user: true,
        },
      });

      if (!token) {
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Invalid token",
        });
      }

      const jwt = signJwt({
        email: token.user.email,
        id: token.user.id,
        name: token.user.name,
        role: token.user.role,
      });

      ctx.res.setHeader("Set-Cookie", serialize("token", jwt, { path: "/" }));

      return {
        redirect: token.redirect,
      };
    },
  })
  .mutation('remove-otp', {
    resolve: async ({ ctx }) => {
      ctx.res.setHeader('Set-Cookie', serialize('token', '', { path: '/' }))
    }
  })
  .query("me", {
    resolve: async ({ ctx }) => {
      return ctx.user;
    },
  });
