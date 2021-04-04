import getFirebaseAdmin from "../../utils/firebaseadmin.js";

export default async function user(req, res) {
  if (req.method !== "GET")
    return res
      .status(404)
      .send(JSON.stringify({ status: "error", error: "Error_NotFound" }));

  const admin = await getFirebaseAdmin();
  var db = admin.firestore();
  const ref = db.collection("users");
  const documents = await ref.get();

  var paths = [];
  documents.forEach((doc) => {
    var data = doc.data();
    delete data.email;

    paths.push(data);
  });

  res.send(JSON.stringify(paths));
}
