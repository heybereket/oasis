import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getFirebase } from "../../utils/firebase";
const firebase = getFirebase();

const User = () => {
  const router = useRouter()
  const { username } = router.query
  
  const db = firebase.firestore();

  useEffect(() => {
    if (username){
      let docRef = db.collection("users").where("username", "==", username);
    docRef.get().then(querySnapshot => {
      const empty = querySnapshot.empty;
        if (empty) {
              window.location = "/"
          } else {
              alert("exists")
          }
    });
    }
  }, []);

  return (
      <div>
          <h1>{username}</h1>
      </div>
  );
}

export default User