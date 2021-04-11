import { getFirebase } from '../data/firebase';

const firebase = getFirebase();
const db = firebase.firestore();

// Delete Repo from Oasis/Firestore
async function deleteRepo(id) {
  await db.collection('repos').doc(id).delete();
  window.location.reload();
  return;
}

export { deleteRepo };
