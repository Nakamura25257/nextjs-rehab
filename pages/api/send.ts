import {NextApiRequest, NextApiResponse} from 'next';

/**
 * TOFO：nodemailerで特定のメールアドレスへ送信するAPI
 */
type ResponseData = {message: string};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const {username, email} = req.body;

  if (!username) {
    // usernameが空の場合
    res.status(400).json({message: 'ユーザー名が未入力です'});
  } else if (!email) {
    // emailが空の場合
    res.status(400).json({message: 'メールアドレスが未入力です'});
  } else {
    // contentが未入力の場合
    res.status(400).json({message: '内容が未入力です'});
  }

  return res.status(200).json({message: '送信完了'});
}
