import { Router } from 'express';
import { redisClient } from '@root/index';
import { sign } from 'jsonwebtoken';
import User from '@entities/User';

export default function VSCodeAuth() {
  const router = Router();
  router.post('/grant-access', async (req, res) => {
    const uid = (req.session as any)?.passport?.user?.id;

    console.log(uid);

    if (!uid) return res.status(401).send('Not Logged In!');

    try {
      const authId = req.headers.authorization;

      if (!authId)
        throw new Error('No `authId` field was passed in the JSON body');

      redisClient.setex(`aid:${authId}`, 30, uid, (err, s) => {
        console.log({ err, s });
      });

      res.send({ authId });
    } catch (e) {
      console.log(e);
      res.send('ERROR: ' + e.message);
    }
  });

  router.get('/get-access', async (req, res) => {
    const { authId } = req.query;

    if (!authId) return;

    console.log({ authId });

    redisClient.get(`aid:${authId}`, async (err, uid) => {
      console.log('GET /vscode', { uid });

      if (err) {
        console.log(err);
        res.send('ERROR: ' + err);
      }

      const user = await User.findOne(uid);
      user.vscTokenCount = 0;
      await user.save();

      redisClient.del(`aid:${authId}`);

      res.send({
        accessToken: sign(
          { uid, count: 0 },
          process.env.AID_ACCESS_TOKEN_SECRET,
          {
            expiresIn: '15m',
          }
        ),
        refreshToken: sign({ uid }, process.env.AID_REFRESH_TOKEN_SECRET, {
          expiresIn: '7d',
        }),
      });
    });
  });

  return router;
}
