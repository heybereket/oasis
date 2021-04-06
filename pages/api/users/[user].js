import getFirebaseAdmin from '../../../utils/firebaseadmin.js';
import { formatData, sendStatus } from '../../../utils/apiFormatter';

export default async function user(req, res) {
  if (req.method !== 'GET') return res.status(404).send(sendStatus(res, 'CannotMethod'));
  if (!req.query.user) return res.status(401).send(sendStatus(res, 'InvalidParams'));

  var user = req.query.user;
  const admin = await getFirebaseAdmin();
  var db = admin.firestore();

  let docRef = db.collection('users').where('username', '==', user);

  await docRef
    .limit(1)
    .get()
    .then(async querySnapshot => {
      if (querySnapshot.empty) return res.status(404).send(sendStatus(res, 'InvalidUserName'));

      querySnapshot.forEach(async doc => {
        var data = doc.data();
        delete data.email;
        res.send(formatData(data));
      });
    });
}
