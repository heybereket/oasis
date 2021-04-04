import getFirebaseAdmin from "../../utils/firebaseadmin.js";
import { formatError, formatData } from "../../utils/apiFormatter";

export default async function user(req, res) {
  if (req.method !== "POST")
    return res.status(404).send(formatError("Error_NotFound"));

  if (!req.body.username)
    return res.status(401).send(formatError("Error_MissingParams"));

  var user = req.body.username;
  const admin = await getFirebaseAdmin();
  var db = admin.firestore();

  let docRef = db.collection("users").where("username", "==", user);

  await docRef
    .limit(1)
    .get()
    .then(async (querySnapshot) => {
      if (querySnapshot.empty)
        return res.status(404).send(formatError("Error_InvalidUsername"));

      querySnapshot.forEach(async (doc) => {
        var data = await doc.data();
        delete data.email;
        res.send(formatData(data));
      });
    });
}
