/**
 * Zodスキーマ定義
 */

import z from 'zod';

const emailPattern = /^[\u0021-\u007e]+$/u;
export const UserSchema = z.object({
  username: z.string().min(1, '入力してください'),
  email: z
    .string()
    .email('正しいメールアドレスを入力してください')
    .regex(emailPattern),
  content: z.string().min(1, '入力してください'),
});

export type Schema = z.infer<typeof UserSchema>;
