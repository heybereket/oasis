export const getRefData = async (ref: FirebaseFirestore.DocumentReference) => {
  const snap = await ref.get();
  return { id: snap.id, ...snap.data() };
};
