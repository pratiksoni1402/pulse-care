import { betterAuth, socialProviders } from 'better-auth'
import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import * as schema from '@/db/schema/auth'
import { db } from '@/db'
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'mysql',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
})
