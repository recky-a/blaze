'server only';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Looks up a user by their email address and returns the user's information.
 *
 * This function is intended to be used by the `next-auth` library to verify
 * credentials. It returns the user's information, but does not include the user's
 * password, email verification status, id, or image.
 *
 * If no user is found matching the given email address, this function returns
 * null.
 */
export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    columns: {
      password: false,
      emailVerified: false,
      id: false,
      image: false,
    },
    where: eq(users.email, email),
  });

  if (user) {
    return user;
  }
  return null;
}
