'use client';

import '../app/styles/form.css';
import {useForm} from 'react-hook-form';
import {Schema, UserSchema} from '../app/schemas/user';
import {zodResolver} from '@hookform/resolvers/zod/dist/zod.js';
import {useRouter} from 'next/router';

export default function FormPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Schema>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = async (data: Schema) => {
    // メール送信先に対して、dataを送る
    await router.push({
      pathname: '/confirm',
      query: data,
    });
  };

  return (
    <div className="container">
      <h1 className="title">お問い合わせ</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="名前"
          className="input"
          {...register('username')}
        />
        {errors.username && (
          <p className="errorMessage">{errors.username.message}</p>
        )}
        <input
          type="email"
          placeholder="メールアドレス"
          className="input"
          {...register('email')}
        />
        {errors.email && <p className="errorMessage">{errors.email.message}</p>}
        <textarea
          placeholder="内容"
          className="textarea"
          {...register('content')}
        />
        {errors.content && (
          <p className="errorMessage">{errors.content.message}</p>
        )}
        <button type="submit" className="button">
          確認画面へ
        </button>
      </form>
    </div>
  );
}
