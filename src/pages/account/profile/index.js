import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';

import SignOut from '../../../utils/signOut';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../../firebaseConfig.js'

import "./styles.scss";
import { PostBody } from "../../../components/Post/index.js";
import Sidebar from "../../../components/barralateral";

import IMAGES from '../../../images/images.js';

export function Profile() {

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

  function logOut() {

    SignOut();
    history.push('/');

  }

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

      <div className="profileBody">
        <Sidebar />
        <section className="profileSection">
          <div className="profileMain">
            <main>
              <div className="profileInfos">
                <div className="profileResume">

                  <div className="profileResumeImgWrapper">
                    <img src={dataAccount.profilePicture ? dataAccount.profilePicture : IMAGES.BlankProfilePicture} alt="Profile Icon" />
                  </div>

                  <div className="nameAndWork">
                    <h2>{dataAccount.name}</h2>
                    <h3>{dataAccount.userType}</h3>
                  </div>

                </div>
                <div className="profileDescription">
                  <p>
                    Professora na Escola Guadiões da Galáxia. Apaixonada por
                    livros e ideias criativas. #DIY #thinkoutsidethebox
                  </p>
                </div>
              </div>
              <div className="profileFollows">
                <p>XX seguidores</p>
                <p>XX seguindo</p>
              </div>

              <div className="profileActions">
                <Link to="/editarPerfil">Editar perfil</Link>
                <button onClick={() => logOut()}>Sair da conta</button>
              </div>

            </main>
          </div>
          
          <PostBody />

        </section>
      </div>

    )
  } else {

    return (
      // <Redirect to='/' />
      null
    )

  }

}