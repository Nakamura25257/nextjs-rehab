'use client';

import {SubmitHandler, useForm} from 'react-hook-form';
import '../styles/form.css';
import {useState} from 'react';
import {z} from 'zod';
import {UserSchema} from '../schemas/user';
import {zodResolver} from '@hookform/resolvers/zod/dist/zod.js';

type Schema = z.infer<typeof UserSchema>;

export default function FormPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<Schema>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit: SubmitHandler<Schema> = data => {
    UserSchema.parse({
      username: data.username,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
  };

  return (
    <div className="container">
      <h1 className="title">登録フォーム</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="名前"
          className="input"
          {...register('username')}
        />
        <input
          type="email"
          placeholder="メールアドレス"
          className="input"
          {...register('email')}
        />
        <input
          type="password"
          placeholder="パスワード"
          className="input"
          {...register('password')}
        />
        <input
          type="password"
          placeholder="確認用パスワード"
          className="input"
          {...register('passwordConfirm')}
        />
        <button type="submit" className="button">
          登録
        </button>
      </form>
    </div>
  );
}
