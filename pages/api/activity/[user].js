import getFirebaseAdmin from '../../../utils/firebaseadmin.js';
import { formatData, sendStatus } from '../../../utils/apiFormatter';

const DEFAULT_LIMIT = 10;

export default async function user(req, res) {
  if (req.method !== 'GET') return res.status(404).send(sendStatus(res, 'CannotMethod'));
  if (!req.query.user) return res.status(401).send(sendStatus(res, 'InvalidParams'));

  let { limit, user } = req.query;
  if (!limit) limit = DEFAULT_LIMIT;

  const admin = await getFirebaseAdmin();
  let db = admin.firestore();

  let docRef = db.collection('users').where('username', '==', user);
  const querySnapshot = await docRef.get();

  if (querySnapshot.empty) return res.status(404).send(sendStatus(res, 'InvalidUserName'));

  querySnapshot.forEach(doc => {
    let data = doc.data();
    let activity = data.activity;
    if (limit !== 'max') activity = activity.slice(0, limit);
    res.send(formatData(activity));
  });
}
