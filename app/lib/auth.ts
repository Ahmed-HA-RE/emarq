import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { nextCookies } from 'better-auth/next-js';
import { Resend } from 'resend';
import VerifyEmail from 'emails/VerifyEmail';
import ResetPassword from 'emails/ResetPassword';
import { createAuthMiddleware } from 'better-auth/plugins';

const resend = new Resend(process.env.RESEND_API_KEY);

const client = new MongoClient(process.env.MONGODB_URI || '');
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.query?.error === 'access_denied') {
        throw ctx.redirect('/signin');
      }
    }),
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },

  user: {
    additionalFields: {
      defaultAvatar: {
        type: 'string',
        input: false,
        defaultValue:
          'https://res.cloudinary.com/ahmed--dev/image/upload/v1762194054/profile_qjxmpc.png',
      },
      bookmarks: {
        type: 'string[]',
        input: true,
        defaultValue: [],
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 6,
    maxPasswordLength: 25,
    sendResetPassword: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: 'support@ahmedrehandev.net',
        to: user.email,
        subject: 'Reset your password',
        react: ResetPassword({ name: user.name, resetPasswordLink: url }),
      });
    },
    resetPasswordTokenExpiresIn: 60 * 60 * 24, // 1 hr
  },

  emailVerification: {
    expiresIn: 60 * 60 * 24, // 1 hr
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: 'support@ahmedrehandev.net',
        to: user.email,
        subject: 'Verify your email address',
        react: VerifyEmail({ name: user.name, url }),
        replyTo: 'ah607k@gmail.com',
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: 'consent',
      overrideUserInfoOnSignIn: true,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      prompt: 'consent',
      overrideUserInfoOnSignIn: true,
    },
  },

  plugins: [nextCookies()],
});
