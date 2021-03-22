import '../style/Admin.css'
import firebase from '../data/firebase'
import { useEffect, useState } from 'react'
import { Navbar } from '../components'
import '../style/Account.css'

const Account = () => {
    const db = firebase.firestore();
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const user = firebase.auth().currentUser;

    useEffect(() => {
        db.collection("projects")
          .get()
          .then((snapshot) => {
            let projects = [];
    
            snapshot.forEach((doc) => {
              projects.push(doc.data());
            });
            setList(projects);
            setIsLoading(false)
          });
      }, []);

    return (
      <>

      <Navbar />
      


      <section class="all-text">



  <section>
  <img className="logo" src={user ? user.photoURL : ''} />

    <h1 class="section-header"> Name:
      </h1>
    <p class="section-content"> {user ? user.displayName : 'No display name found.' }
      </p>
</section>
    <h1 class="section-header"> Email:
       </h1>
    <p class="section-content"> {user ? user.email : 'No email found.' }
      </p>
<section> 
    <h1 class="section-header"> Danger Zone
      </h1>
    <p class="section-content">
      Danger stuff here
      </p>
</section>
<section>  
</section>
      </section>

  
      </>
    );
  };
  
  export default Account;
  