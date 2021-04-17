import getFirebaseAdmin from './firebase-admin';

export async function admindb(): Promise<FirebaseFirestore.Firestore> {
  const admin = await getFirebaseAdmin();
  return admin.firestore();
}
