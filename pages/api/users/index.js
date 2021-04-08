import getFirebaseAdmin from '../../../utils/firebaseadmin.js';
import { sendStatus, formatData } from '../../../utils/apiFormatter';
import rateLimit from '../../../utils/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async function users(req, res) {

  if (req.method !== 'GET') return sendStatus(res, 'CannotMethod');

  const admin = await getFirebaseAdmin();
  var db = admin.firestore();
  const ref = db.collection('users');

  const { limit } = req.query;

  var docRef = await ref.orderBy('username');
  if (limit !== 'max') docRef = docRef.limit(parseInt(limit, 10) || 10);
  var documents = await docRef.get();

  var users = [];
  documents.forEach(doc => {
    var data = doc.data();
    delete data.email;
    users.push(data);
  });

  try {
    await limiter.check(res, 10, 'CACHE_TOKEN') // 10 requests per minute
    res.status(200).send(formatData(users));
  } catch {
    res.status(429).json({ error: 'Rate limit exceeded' })
  }
}
