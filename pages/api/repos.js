import getFirebaseAdmin from '../../utils/firebaseadmin.js';
import { sendStatus, formatData } from '../../utils/apiFormatter';

export default async function user(req, res) {
  if (req.method !== 'GET') return sendStatus(res, 'CannotMETHOD');

  const { limit } = req.query

  const admin = await getFirebaseAdmin();
  var db = admin.firestore();
  const ref = db.collection('repos').orderBy('name').limit(parseInt(limit, 10) || 10);
  const documents = await ref.get();

  var repositories = [];
  documents.forEach(doc => {
    var data = doc.data();
    delete data.submitted_by
    delete data.archived
    delete data.stars
    delete data.avatar
    delete data.fork
    delete data.likes
    repositories.push(data);
  });

  res.status(200).send(formatData(repositories));
}
