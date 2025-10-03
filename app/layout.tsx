import FormPage from './form/page';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <FormPage />
      </body>
    </html>
  );
}
