import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig.js';

import Sidebar from "../../components/barralateral";
import { PostBody } from "../../components/Post/index.js";

import "./styles.scss";
import IMAGES from "../../images/images.js";

export function Feed() {

  const [userIsLogged, setUserIsLogged] = useState(false);
  const [dataAccount, setDataAccount] = useState([]);

  let history = useHistory();

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

          temp.map((item) => {

            if (item.email === userEmail)
              setDataAccount(item)

            return 0;

          })

        } else {
          console.log("No data available");
        }
      })

  }, []);

  function onAuthStateChanged(user) {

    firebase.auth().onAuthStateChanged((user) => {
      if (user)
        setUserIsLogged(true)
    });

  }

  useEffect(() => {

    window.scrollTo(0, 0);

    if (!firebase.apps.length)
      firebase.initializeApp(firebaseConfig)
    onAuthStateChanged();

  }, []);

  if (userIsLogged) {

    return (
      <div className="feedBody">
        <Sidebar />
        <section className="feedSection">
          <div className="makeAPost">
            <div className="postPic">
            <img src={dataAccount.profilePicture ? dataAccount.profilePicture : IMAGES.BlankProfilePicture} alt="Profile Icon" />
            </div>
            <div className="postArea">
              <div className="postInput">
                <textarea type="text" placeholder="Compartilhe sua ideia..." />
              </div>
              <div className="postButton">
                <img src={IMAGES.Ballons} alt="Ballons" />
                <button type="submit">Publicar!</button>
              </div>
            </div>
          </div>

          <PostBody />

        </section>
      </div>
    );

  } else {

    return null;

  }

}