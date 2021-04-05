import { parseCookies } from 'nookies';
import { formatData, sendStatus } from '../../utils/apiFormatter';
import verifyCookie from '../../utils/verifyCookie';

export default async function repo(req, res) {
  var cookies = await parseCookies({ req });
  var userData = await verifyCookie(cookies.user);

  if (!userData.hasAuth) return sendStatus(res, 'Unauthorized');
  if (!req.body.repoName) return sendStatus(res, 'InvalidParams');
  if (!req.body.repoName.match(/^.+\/.+$/gm)) return sendStatus(res, 'InvalidParams');

  fetch('https://api.github.com/repos/' + req.body.repoName)
    .then(res => res.json())
    .then(body => {
      res.status(200).send(formatData(body));
    });
}
