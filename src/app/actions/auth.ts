'use server';

import { getUserByEmail } from '@/data/user-dto';
import { db } from '@/db';
import { users } from '@/db/schema';
import { registerFormSchema } from '@/lib/zod';
import { z } from 'zod';
import { Argon2id } from 'oslo/password';
import { ActionResult } from '@/lib/definitions';

export async function register(
  values: z.infer<typeof registerFormSchema>
): Promise<ActionResult> {
  try {
    // Validate the form
    const validatedData = await registerFormSchema.parseAsync(values);

    // Check if user exists
    const existingUser = await getUserByEmail(validatedData.email);

    if (existingUser) {
      return {
        success: false,
        message: 'Pengguna sudah ada',
      };
    }

    // Hash the password
    const argon2id = new Argon2id();
    const hashedPassword = await argon2id.hash(validatedData.password);

    // Register user
    await db.insert(users).values({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
    });
    return {
      success: true,
      message: 'Pengguna berhasil mendaftar',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      };
    }
    return {
      success: false,
      message: 'Terjadi kesalahan yang tidak terduga',
    };
  }
}
