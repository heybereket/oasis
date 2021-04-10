import getFirebaseAdmin from '../../../utils/firebaseadmin.js';
import { formatData, sendStatus } from '../../../utils/apiFormatter';

export default async function user(req, res) {
  if (req.method !== 'GET') return res.status(404).send(sendStatus(res, 'CannotMethod'));
  if (!req.query.user) return res.status(401).send(sendStatus(res, 'InvalidParams'));

  var { limit, user } = req.query;
  if (!limit) limit = 10;

  const admin = await getFirebaseAdmin();
  var db = admin.firestore();

  let docRef = db.collection('users').where('username', '==', user);

  await docRef.get().then(async querySnapshot => {
    if (querySnapshot.empty) return res.status(404).send(sendStatus(res, 'InvalidUserName'));

    querySnapshot.forEach(async doc => {
      var data = doc.data();
      var activity = data.activity;
      if (limit !== 'max') activity = activity.slice(0, limit);
      res.send(formatData(activity));
    });
  });
}
