import getFirebaseAdmin from '../../../utils/firebaseadmin.js';
import { formatData, sendStatus } from '../../../utils/apiFormatter';
import rateLimit from '../../../utils/rate-limit'

const limiter = rateLimit({
  interval: 3600000, // 1 hour 
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async function user(req, res) {
  if (req.method !== 'GET') return res.status(404).send(sendStatus(res, 'CannotMethod'));
  if (!req.query.user) return res.status(401).send(sendStatus(res, 'InvalidParams'));

  var user = req.query.user;
  const admin = await getFirebaseAdmin();
  var db = admin.firestore();

  let docRef = db.collection('users').where('username', '==', user);

  await docRef
    .get()
    .then(async querySnapshot => {
      if (querySnapshot.empty) return res.status(404).send(sendStatus(res, 'InvalidUserName'));

      querySnapshot.forEach(async doc => {
        var data = doc.data();
        delete data.email;
        try {
          await limiter.check(res, 1000, 'CACHE_TOKEN') // 1000 requests per hour
          res.status(200).send(formatData(data));
        } catch {
          res.status(429).json({ error: 'Rate limit exceeded' })
        }
      });
    });
}