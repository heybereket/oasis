import getFirebaseAdmin from '../../../utils/firebaseadmin.js';
import { formatData, sendStatus } from '../../../utils/apiFormatter';
import rateLimit from '../../../utils/rate-limit';
import publicIp from 'public-ip';

const limiter = rateLimit({
  interval: 3600000, // 1 hour
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function user(req, res) {
  if (req.method !== 'GET') return res.status(404).send(sendStatus(res, 'CannotMethod'));
  if (!req.query.user) return res.status(401).send(sendStatus(res, 'InvalidParams'));

  var user = req.query.user;
  const admin = await getFirebaseAdmin();
  var db = admin.firestore();

  let snapshotByName = await db.collection('users').where('username', '==', user).get();
  let snapshotByID = await db.collection('users').where('uid', '==', user).get();

  if (snapshotByName.empty && snapshotByID.empty)
    return res.status(404).send(sendStatus(res, 'InvalidUserName'));

  var snapshot = snapshotByName;
  if (snapshotByName.empty) snapshot = snapshotByID;

  snapshot.forEach(async doc => {
    var data = doc.data();
    delete data.email;
    delete data.activity;

    try {
      await limiter.check(res, 3000, 'CACHE_TOKEN'); // 1000 requests per hour
      res.status(200).send(formatData(data));
    } catch {
      const ip = await publicIp.v4();
      res.status(429).json({ error: `Uh oh! Rate limit exceeded for IP: ${ip} for 1 hour.` });
    }
  });
}
