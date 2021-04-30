export { ProfilePage as default } from '../../modules/profile/ProfilePage';

// import firebase from 'firebase';
// import { useEffect, useState } from 'react';
// import { ProfilePage } from '../../modules/profile/ProfilePage';
// import {} from '@oasis/api/';

// interface IMyProfileProps {
//   userData: string;
// }

// export const MyProfilePage: React.FC<IMyProfileProps> = () => {
//   const [userData, setUserData] = useState('');
//   useEffect(() => {
//     async () => {
//       const db = firebase.firestore();
//       const auth = firebase.auth().currentUser;
//       console.log(auth?.uid);
//       const user = await db.doc(`users/${auth?.uid}`).get();
//       const docData = JSON.stringify(user?.data());
//       setUserData(docData);
//     };
//   }, []);
//   return <ProfilePage userData={userData} />;
// };

// export default MyProfilePage;
