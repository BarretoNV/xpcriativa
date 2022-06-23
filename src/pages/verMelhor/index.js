import React, { useState, useEffect} from "react";
import "./styles.scss";
import Sidebar from "../../components/barralateral";
import IMAGES from "../../images/images.js";

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig.js';

export function VerMelhor() {

  const [dataProfile, setDataProfile] = useState({});
  const [dataUsers, setDataUsers] = useState({});

  useEffect(() => {

    window.scrollTo(0, 0);

    const userEmail = localStorage.getItem('userEmail')

    if (!firebase.apps.length)
      firebase.initializeApp(firebaseConfig)

    firebase.database().ref('users/').get('/users')
      .then(function (snapshot) {

        if (snapshot.exists()) {

          var data = snapshot.val()
          var temp = Object.keys(data).map((key) => data[key])
          setDataUsers(temp);

          temp.forEach((item) => {
            if (item.email === userEmail) {
                setDataProfile(item)
            }
          })

        } else {
          console.log("No data available");
        }
      })

  }, []);

  return (
    <div className="verMelhorBody">
      <Sidebar />
      <section className="verMelhorSection">
        <div className="searchAndTags">
          <div className="searchBar">
            <button>
              <img src={IMAGES.Lupa} alt="Lupa" />
            </button>
            <input type="text" placeholder=""></input>
          </div>
          <div className="tagsBar">
            <a href="/">#TAGNAME</a>
            <a href="/">#TAGNAME</a>
            <a href="/">#TAGNAME</a>
            <a href="/">#TAGNAME</a>
          </div>
        </div>

        {/* <h1>Embed do Google</h1> */}

        <div className="usersList">
          <table className="tableUsers">
            <tbody>
                {dataUsers.length > 0 ? dataUsers.map((user, index) => ( user.id !== dataProfile.id ? 
                    (
                        <tr key={index}>
                            <td className="profileImgWrapper"><img src={user.profilePicture} alt="" /></td>
                            <td><b>{user.name}</b></td>
                            <td><button type="button">Adicionar</button></td>
                        </tr>
                    ) : null )) : null
                }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}