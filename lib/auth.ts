import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma"; // your prisma client instance

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    line: {
      clientId: process.env.LINE_CLIENT_ID as string,
      clientSecret: process.env.LINE_CLIENT_SECRET as string,
      // redirectURI: "https://your.app/api/auth/callback/line", // uncomment to use a custom redirect URI
      // scope: ["custom"], // uncomment to add additional scopes
      // disableDefaultScope: true, // uncomment to replace default scopes [`openid`, `profile`, `email`]
    },
  },
});
