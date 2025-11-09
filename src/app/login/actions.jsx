'use server';

import { z } from 'zod';
import { createSession, deleteSession } from '../lib/session';
import { redirect } from 'next/navigation';
import users from '@/src/data/users.json';
import { hashString, verifyHash } from '@/src/utils/handleHash';

// default firstuser password -> 12345678
const firstUser = users[0];

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }).trim(),
});

export async function login(prevState, formData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const hashVerified = await verifyHash(password, firstUser.password);

  if (email !== firstUser.email || !hashVerified) {
    return {
      errors: {
        email: ['Invalid email or password'],
      },
    };
  }

  await createSession(firstUser.id);

  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
