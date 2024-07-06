import { signupSchema } from "@/utils/validations/auth/signup-vaildation";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { compareSync, hashSync } from "bcryptjs";
import { signinSchema } from "@/utils/validations/auth/signin-validation";
import { signIn } from "next-auth/react";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    return ctx.session?.user;
  }),
  createUser: publicProcedure
    .input(signupSchema)
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const existingUser = await db.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      const hashedPassword = hashSync(password, 12);

      const user = await db.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return user;
    }),
  login: publicProcedure.input(signinSchema).mutation(async ({ input }) => {
    const { email, password } = input;
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const passwordMatch = compareSync(password, user.password);

    if (!passwordMatch) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Incorrect email or password",
      });
    }

    await signIn<"credentials">("credentials", {
      email,
      password,
    });

    return { success: true };
  }),
});
