/**
 * Zodスキーマ定義
 */

import z from 'zod';

const emailPattern = /^[\u0021-\u007e]+$/u;

export const UserSchema = z
  .object({
    username: z
      .string()
      .min(2, 'Please input more than 2 characters')
      .max(30, 'Too many characters'),
    email: z
      .string()
      .email('Please input correct Email address')
      .regex(emailPattern),
    password: z.string().min(5, 'Password should be more than 5 characters'),
    passwordConfirm: z
      .string()
      .min(5, 'Password should be more than 5 characters'),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: 'Password mismatch',
    path: ['passwordConfirm'], // エラー表示するフィールドを定義
  });
