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

          let data = snapshot.val()
          let temp = Object.keys(data).map((key) => data[key])

          temp.forEach((item) => {
            if (item.email === userEmail) {
              if (item.followers) {
                item.followers = Object.keys(item.followers).map((key) => item.followers[key])
              }

              if (item.following) {
                item.following = Object.keys(item.following).map((key) => item.following[key])
              }

              setDataAccount(item)
            }
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
                    {dataAccount.description ? dataAccount.description : `Perfil sem descrição. Para adicionar uma descrição, acesse "Editar perfil".` }
                  </p>
                </div>
              </div>
              <div className="profileFollows">
                {dataAccount.followers ? (
                  <p>{dataAccount.followers.length} seguidores</p>
                ) : (
                  <p>Nenhum seguidor</p>
                )}

                {dataAccount.following ? (
                  <p>{dataAccount.following.length} seguindo</p>
                ) : (
                  <p>Você não segue ninguém</p>
                )}
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