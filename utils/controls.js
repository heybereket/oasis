import { getFirebase } from "../data/firebase";
const firebase = getFirebase()
// initialize firebase firestore db object
const db = firebase.firestore();

// contain utility functions for managing project (create, delete)

async function deleteRepo(id) {
  // delete project from firestore
  await db.collection("repos").doc(id).delete();

  // reload window
  window.location.reload();
  return;
}

export { deleteRepo };