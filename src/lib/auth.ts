import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { schema } from "./zod";
import bcrypt from "bcryptjs";
import { InvalidCredentialsError } from "@/lib/error";
import { APP_STRINGS } from "@/app/common/magic-strings";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        //IF USER WHO IS SIGNED IN VIA GOOGLE OAUTH TRIES TO LOGIN VIA CREDENTIALS, SKIP SINCE THEY DONT HAVE A PASSWORD
        if (credentials?.password === undefined) {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });
          if (!user)
            throw new InvalidCredentialsError(
              APP_STRINGS.ERRORS.COMMON.USER_NOT_FOUND
            );

          return user;
        }

        //VALIDATE VIA ZOD
        const validated = schema.safeParse(credentials);

        if (validated.error)
          throw new InvalidCredentialsError(
            APP_STRINGS.ERRORS.COMMON.COULD_NOT_PARSE_CREDS
          );

        const { email, password } = validated.data;

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user)
          throw new InvalidCredentialsError(
            APP_STRINGS.ERRORS.COMMON.INVALID_CREDENTIAL
          );

        const isPasswordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword!
        );

        if (!isPasswordsMatch)
          throw new InvalidCredentialsError(
            APP_STRINGS.ERRORS.COMMON.INVALID_CREDENTIAL
          );

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
});
