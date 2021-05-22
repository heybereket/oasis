import * as express from 'express';
import { config } from 'dotenv';
import { sign, verify } from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import fetch from 'node-fetch';

config();

const baseurl =
  process.env.NODE_ENV === 'production'
    ? 'https://oasis.sh'
    : 'http://localhost:3000';

const app = express();

app.get('/login-creds', (_, res) => {
  res.send({
    authIdToken: sign({ authId: nanoid() }, process.env.AUTH_ID_SECRET),
  });
});

app.get('/get-data', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  const { authId }: any = verify(token, process.env.AUTH_ID_SECRET);

  const response = await fetch(`${baseurl}/api/auth/vscode/get-access`, {
    headers: {
      authorization: `${process.env.ID_TOKEN} ${authId}`,
    },
  });

  const data = await response.json();
  console.log({ data });
  res.send(data);
});

app.listen(process.env.PORT || 5000);
