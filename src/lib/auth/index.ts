import NextAuth from 'next-auth';
import authConfig from '@/lib/auth/config';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from '@/db/schema';

const adapter = DrizzleAdapter(db, {
  usersTable: users,
  accountsTable: accounts,
  sessionsTable: sessions,
  authenticatorsTable: authenticators,
  verificationTokensTable: verificationTokens,
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  ...authConfig,
});
