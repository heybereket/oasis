import { parseCookies } from 'nookies';
import { formatData, sendStatus } from '../../utils/apiFormatter';
import verifyCookie from '../../utils/verifyCookie';

export default async function repo(req, res) {
  var cookies = parseCookies({ req });
  var userData = await verifyCookie(cookies.user);

  if (!userData.hasAuth) return sendStatus(res, 'Unauthorized');
  if (!req.body.repoName) return sendStatus(res, 'InvalidParams');
  if (!req.body.repoName.match(/^.+\/.+$/gm)) return sendStatus(res, 'InvalidParams');

  const repo = req.body.repo;
  const admin = await getFirebaseAdmin();
  const db = admin.firestore();

  let docRef = db.collection('repos').where('name', '==', repo);

  await docRef
    .limit(1)
    .get()
    .then(async querySnapshot => {
      if (querySnapshot.empty) return res.status(404).send(sendStatus(res, 'InvalidParams'));

      querySnapshot.forEach(async doc => {
        var data = doc.data();
        delete data.email;
        res.send(formatData(data));
      });
    });
}