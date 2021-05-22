import { Router } from 'express';
import { redisClient } from '@root/index';
import { sign, verify } from 'jsonwebtoken';
import User from '@entities/User';

export default function VSCodeAuth() {
  const router = Router();
  router.post('/grant-accesss', async (req, res) => {
    const uid = (req.session as any)?.passport?.user?.id;
    if (!uid) return res.status(401).send('Not Logged In!');

    try {
      const [, token] = req.headers.authorization?.split(' ') || [];

      const { authId }: any = verify(token, process.env.VSCODE_AUTH_ID_SECRET);

      redisClient.setex(`vsc:${authId}`, 30, uid, (err, s) => {
        console.log({ err, s });
      });

      res.send({ authId });
    } catch (e) {
      console.log(e);
      res.send('ERROR: ' + e.message);
    }
  });

  router.get('/get-access', async (req, res) => {
    const [token, authId] = req.headers.authorization.split(' ');

    if (token !== process.env.VSCODE_TOKEN) return res.send(null);

    console.log({ token, authId });

    redisClient.get(`vsc:${authId}`, async (err, uid) => {
      console.log('GET /vscode', { uid });

      if (err) {
        console.log(err);
        res.send('ERROR: ' + err);
      }

      const user = await User.findOne(uid);
      user.vscTokenCount = 0;
      await user.save();

      res.send({
        accessToken: sign(
          { uid, count: 0 },
          process.env.VSCODE_ACCESS_TOKEN_SECRET,
          {
            expiresIn: '15m',
          }
        ),
        refreshToken: sign({ uid }, process.env.VSCODE_REFRESH_TOKEN_SECRET, {
          expiresIn: '7d',
        }),
      });
    });
  });

  return router;
}
