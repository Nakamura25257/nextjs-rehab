import {useRouter} from 'next/router';
import '../app/styles/form.css';

type QueryParams = {
  username: string;
  email: string;
  content: string;
};

export default function ConfirmContactPage() {
  // const
  const router = useRouter();
  const query = router.query;

  const username = typeof query.username === 'string' && query.username;
  const email = typeof query.email === 'string' && query.email;
  const content = typeof query.content === 'string' && query.content;

  const handleSubmit = () => {
    console.log('hoge');
    // ここで特定のメールアドレスに飛ばす
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
