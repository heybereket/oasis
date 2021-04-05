import getFirebaseAdmin from '../../utils/firebaseadmin.js'
import { sendStatus, formatData } from '../../utils/apiFormatter'

export default async function user(req, res) {
  if (req.method !== 'GET') return sendStatus(res, 'CannotMETHOD')

  const admin = await getFirebaseAdmin()
  var db = admin.firestore()
  const ref = db.collection('users')
  const documents = await ref.get()

  var users = []
  documents.forEach(doc => {
    var data = doc.data()
    users.push(data.username)
  })

  res.status(200).send(formatData(users))
}
