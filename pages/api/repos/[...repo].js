import getFirebaseAdmin from '../../../utils/firebaseadmin';
import { formatData, sendStatus } from '../../../utils/apiFormatter';
import verifyCookie from '../../../utils/verifyCookie';

let admin, db;
export default async function repos(req, res) {
  admin = await getFirebaseAdmin();
  db = admin.firestore();

  if (req.method === 'GET') return getRepo(req.query, res);
  if (req.method === 'POST') return addRepo(req.query, req, res);
  sendStatus(res, 'CannotMethod');
}

export async function getRepo(query, res) {
  const [repoUser, repoName] = query.repo;
  let repoFullName = `${repoUser}/${repoName}`;
  let docRef = db.collection('repos').where('full_name', '==', repoFullName);

  const querySnapshot = await docRef.limit(1).get();

  if (querySnapshot.empty) return res.status(404).send(sendStatus(res, 'InvalidRepoName'));

  querySnapshot.forEach(async doc => {
    let data = doc.data();
    delete data.submitted_by;
    delete data.avatar;
    res.send(formatData(data));
  });
}

export async function addRepo(query, req, res) {
  const [repoUser, repoName] = query.repo;
  let repoFullName = `${repoUser}/${repoName}`;

  let userData = await verifyCookie(req);
  if (!repoUser || !repoName) return sendStatus(res, 'InvalidRepoName');
  if (!repoFullName.match(/^.+\/.+$/gm)) return sendStatus(res, 'InvalidRepoName');
  if (!userData.hasAuth) return sendStatus(res, 'Unauthorized');

  let githubResponse = await fetch('https://api.github.com/repos/' + repoFullName);
  githubResponse = await githubResponse.json();

  const {
    message,
    archived,
    fork,
    open_issues_count,
    id,
    full_name,
    name,
    description: desc,
    stargazers_count: stars,
    open_issues: issues,
    html_url: url,
    language,
  } = githubResponse;

  const { login: github_owner } = githubResponse.owner;

  if (message == 'Not Found') return sendStatus(res, 'InvalidRepoName');
  if (archived) return sendStatus(res, 'RepoIsArchived');
  if (fork) return sendStatus(res, 'RepoIsFork');
  if (open_issues_count < 5) return sendStatus(res, 'RepoIsUnder5Issues');

  const docRef = db.collection('repos').doc(`${id}`);
  const doc = await docRef.get();
  const userRef = db.collection('users').doc(`${userData.uid}`);
  const userDoc = await userRef.get();

  if (doc.exists) return sendStatus(res, 'RepoExists');

  let repoData = {
    added_by: userData.uid,
    date_added: admin.firestore.Timestamp.now(),
    active: true,
    github_owner,
    desc,
    full_name,
    name,
    stars,
    issues,
    url,
    id,
    language,
  };

  await docRef.set(repoData);
  await userRef.set(
    {
      activity: [
        {
          type: 'add',
          repo: {
            id: githubResponse.id,
            full_name: githubResponse.full_name,
            name: githubResponse.name,
            active: true,
          },
        },
        ...userDoc.data().activity,
      ],
    },
    { merge: true }
  );
  sendStatus(res, 'Success');
}
