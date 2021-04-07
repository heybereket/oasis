import { parseCookies } from 'nookies';
import getFirebaseAdmin from '../../../utils/firebaseadmin';
import { formatData, sendStatus } from '../../../utils/apiFormatter';
import verifyCookie from '../../../utils/verifyCookie';

var admin, db;
export default async function repos(req, res) {
  admin = await getFirebaseAdmin();
  db = admin.firestore();

  if (req.method === 'GET') return getRepo(req.query, res);
  if (req.method === 'POST') return addRepo(req.query, req, res);
  sendStatus(res, 'CannotMethod');
}

export async function getRepo(query, res) {
  var repoName = `${query.repo[0]}/${query.repo[1]}`;
  let docRef = db.collection('repos').where('full_name', '==', repoName);

  await docRef
    .limit(1)
    .get()
    .then(async querySnapshot => {
      if (querySnapshot.empty) return res.status(404).send(sendStatus(res, 'InvalidRepoName'));

      querySnapshot.forEach(async doc => {
        var data = doc.data();
        delete data.submitted_by;
        delete data.avatar;
        res.send(formatData(data));
      });
    });
}

export async function addRepo(query, req, res) {
  var repoName = `${query.repo[0]}/${query.repo[1]}`;

  var cookies = parseCookies({ req });
  var userData = await verifyCookie(cookies.user);
  if (!query.repo[0] || !query.repo[1]) return sendStatus(res, 'InvalidRepoName');
  if (!repoName.match(/^.+\/.+$/gm)) return sendStatus(res, 'InvalidRepoName');
  if (!userData.hasAuth) return sendStatus(res, 'Unauthorized');

  await fetch('https://api.github.com/repos/' + repoName)
    .then(res => res.json())
    .then(async body => {
      if (body.message == 'Not Found') return sendStatus(res, 'InvalidRepoName');
      if (body.archived) return sendStatus(res, 'RepoIsArchived');
      if (body.fork) return sendStatus(res, 'RepoIsFork');
      if (body.open_issues_count < 5) return sendStatus(res, 'RepoIsUnder5Issues');
      const docRef = db.collection('repos').doc(`${body.id}`);
      const doc = await docRef.get();

      const userRef = db.collection('users').doc(`${userData.uid}`);
      const userDoc = await userRef.get();
      if (doc.exists) return sendStatus(res, 'RepoExists');

      var repoData = {
        github_owner: body.owner.login,
        added_by: userData.uid,
        date_added: admin.firestore.Timestamp.now(),
        desc: body.description,
        active: true,
        full_name: body.full_name,
        name: body.name,
        stars: body.stargazers_count,
        issues: body.open_issues,
        url: body.html_url,
        id: body.id,
        language: body.language,
      };
      await docRef.set(repoData);

      await userRef.set(
        {
          feed: [
            {
              type: 'add',
              repo: {
                id: body.id,
                full_name: body.full_name,
                name: body.name,
                active: true,
              },
            },
            ...userDoc.data().feed,
          ],
        },
        { merge: true }
      );

      sendStatus(res, 'Success');
    });
}
