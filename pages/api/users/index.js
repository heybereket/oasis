import getFirebaseAdmin from '../../../utils/firebaseadmin.js';
import { sendStatus, formatData } from '../../../utils/apiFormatter';

export default async function users(req, res) {
  if (req.method !== 'GET') return sendStatus(res, 'CannotMethod');

  const admin = await getFirebaseAdmin();
  var db = admin.firestore();
  const ref = db.collection('users');

  const { limit } = req.query;
  const documents = await ref
    .orderBy('username')
    .limit(parseInt(limit, 10) || 10)
    .get();

  var users = [];
  documents.forEach(doc => {
    var data = doc.data();
    delete data.email;
    users.push(data);
  });

  res.status(200).send(formatData(users));
}
