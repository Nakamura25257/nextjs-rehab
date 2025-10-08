'use client';

import {NextRouter, useRouter} from 'next/router';
import '../app/styles/form.css';
import {PostData} from '@/types/contact/contact';
import {FormEvent, useEffect} from 'react';

type QueryParams = {
  username: string;
  email: string;
  content: string;
};

export default function ConfirmContactPage() {
  const router: NextRouter = useRouter();
  const username =
    typeof router.query.username === 'string' ? router.query.username : '';
  const email =
    typeof router.query.email === 'string' ? router.query.email : '';
  const content =
    typeof router.query.content === 'string' ? router.query.content : '';

  useEffect(() => {
    const redirectFunc = async (): Promise<void> => {
      await router.push('/contact');
    };

    if (!username || !email || !content) {
      redirectFunc().catch((error: unknown) => {
        console.error(error);
      });
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const postData: PostData = {
      username: username,
      email: email,
      content: 'content',
    };

    const res = await fetch('api/send', {
      method: 'POST',
      headers: {},
      body: JSON.stringify(postData),
    }).then(res => res.json());
    console.log('res', res);
  };

  return (
    <div className="container">
      <h1 className="title">確認画面</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username"></label>
        <p id="username">{username}</p>

        <label htmlFor="email"></label>
        <p id="email">{email}</p>

        <label htmlFor="content"></label>
        <p id="content">{content}</p>
        <button type="submit" className="button">
          送信
        </button>
      </form>
    </div>
  );
}
