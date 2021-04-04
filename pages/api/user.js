import getFirebaseAdmin from "../../utils/firebaseadmin.js";

export default async function user(req, res) {
  if (req.method !== "POST")
    return res
      .status(404)
      .send(JSON.stringify({ status: "error", error: "Error_NotFound" }));
  if (!JSON.parse(req.body).username)
    return res
      .status(401)
      .send(JSON.stringify({ status: "error", error: "Error_MissingParams" }));

  var user = JSON.parse(req.body).username;
  const admin = await getFirebaseAdmin();
  var db = admin.firestore();

  let docRef = db.collection("users").where("username", "==", user);

  await docRef
    .limit(1)
    .get()
    .then(async (querySnapshot) => {
      if (querySnapshot.empty) return;

      querySnapshot.forEach(async (doc) => {
        var data = await doc.data();
        delete data.email;
        res.send(JSON.stringify({ data }));
      });
    });
}
