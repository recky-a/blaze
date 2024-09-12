import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// import { Argon2id } from 'oslo/password';

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      // authorize: async (credentials) => {
      // },
    }),
  ],
} satisfies NextAuthConfig;
