import '../style/Admin.css'
import firebase from '../data/firebase'
import { useEffect, useState } from 'react'

const Admin = () => {
    const db = firebase.firestore();
    const [list, setList] = useState([]);

    useEffect(() => {
        db.collection("projects")
          .get()
          .then((snapshot) => {
            let projects = [];
    
            snapshot.forEach((doc) => {
              projects.push(doc.data());
            });
            setList(projects);
          });
      }, []);

    return (
      <>

<table>
        <tbody>
        <tr>
    <th>Name</th>
    <th>Owner</th>
    <th>Danger Zone</th>
  </tr>
{
  list.map((project, key) => (
  <tr>
    <td>{project.name}</td>
    <td>{project.owner}</td>
    <td><button>Delete Document</button></td>
  </tr>
  ))}
  </tbody>
    </table>

  
      </>
    );
  };
  
  export default Admin;
  