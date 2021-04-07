import getFirebaseAdmin from '../../../utils/firebaseadmin.js';
import { formatData, sendStatus } from '../../../utils/apiFormatter';

export default async function user(req, res) {
  if (req.method !== 'GET') return res.status(404).send(sendStatus(res, 'CannotMethod'));
  if (!req.query.user) return res.status(401).send(sendStatus(res, 'InvalidParams'));

  var user = req.query.user;
  const admin = await getFirebaseAdmin();
  var db = admin.firestore();

  let docRef = db.collection('users').where('username', '==', user);

  // only point of this to make sure user exists in the db.
  await docRef.get().then(async querySnapshot => {
    if (querySnapshot.empty) return res.status(404).send(sendStatus(res, 'InvalidUserName'));

    querySnapshot.forEach(async doc => {
      var data = doc.data();
      var username = data.username;
      await fetch(`https://api.github.com/users/${username}/events/public?per_page=50`, {
        headers: {
          Authorization: 'token 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',
        },
      })
        .then(res => res.json())
        .then(async json => {
          if (json.message == 'Not Found') return sendStatus(res, 'InvalidUserName');
          const repoRef = db.collection('repos');
          const repoSnapshot = await repoRef.get();
          var repos = [];

          repoSnapshot.forEach(doc => {
            repos.push(doc.id);
          });

          const events = json.filter(item => {
            if (!repos.includes(item.repo.id.toString())) return false;
            return item.type == 'PushEvent' || item.type == 'PullRequestEvent';
          });

          var final = await events.map(event => {
            if (event.type == 'PushEvent')
              return {
                repo: event.repo,
                event: {
                  type: event.type,
                  commits: event.payload.size,
                },
              };

            return {
              repo: event.repo,
              event: {
                type: event.type,
                action: event.payload.action,
              },
            };
          });

          res.send(formatData(final));
        });
    });
  });
}
