const functions = require("firebase-functions");
let isLikeProjectInit = false;

/**
 * Request to like a project made by logged in user.
 */
exports.toggleProjectLiked = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError(
        "unauthenticated", "User is not authenticated.");
  }

  if (!data || !data.projectId) {
    throw new functions.https.HttpsError(
        "failed-precondition", "No project ID has been set.");
  }

  const projectId = data.projectId;

  // Lazy load firebase-admin to reduce function cold start
  const admin = require("firebase-admin");

  if (!isLikeProjectInit) {
    // Initialize only if function is cold started
    admin.initializeApp();
    isLikeProjectInit = true;
  }

  const db = admin.firestore();
  const projectLikesRef = db.collection("project_likes").doc(projectId);
  const likersRef = projectLikesRef.collection("likers").doc(context.auth.uid);
  const projectLikesDocSnap = await projectLikesRef.get();

  if (!projectLikesDocSnap.exists) {
    // Project has never been liked before
    await projectLikesRef.set({likesCount: 1});
    await likersRef.set({likedAt: Date.now()});

    return {
      isProjectLiked: true,
    };
  }

  const likesCount = projectLikesDocSnap.data().likesCount;
  const likerDocSnap = await likersRef.get();

  if (likerDocSnap.exists) {
    await likersRef.delete();

    const newLikesCount = likesCount - 1;

    if (newLikesCount < 1) {
      await projectLikesRef.delete();
    } else {
      await projectLikesRef.update({likesCount: newLikesCount});
    }

    return {
      isProjectLiked: false,
    };
  }

  await projectLikesRef.update({likesCount: likesCount + 1});
  await likersRef.set({likedAt: Date.now()});

  return {
    isProjectLiked: true,
  };
});
