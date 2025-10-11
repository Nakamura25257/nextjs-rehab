'use client';

import Header from '@/app/components/header/Header';

export default function MyApp({Component, pageProps}) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
