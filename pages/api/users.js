import getFirebaseAdmin from "../../utils/firebaseadmin.js";
import { formatError, formatData } from "../../utils/apiFormatter";

export default async function user(req, res) {
  if (req.method !== "GET")
    return res.status(404).send(formatError("Error_NotFound"));

  const admin = await getFirebaseAdmin();
  var db = admin.firestore();
  const ref = db.collection("users");
  const documents = await ref.get();

  var users = [];
  documents.forEach((doc) => {
    var data = doc.data();
    users.push(data.username);
  });

  res.send(formatData(users));
}
