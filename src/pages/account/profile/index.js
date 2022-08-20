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
  const [dataPosts, setDataPosts] = useState([]);

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

  useEffect(() => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    let firebaseRef = firebase.database().ref('posts/');

    firebaseRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val();
            let temp = Object.keys(data).map((key) => data[key]);
            setDataPosts(temp.reverse());
        } else {
            console.log('No data available');
        }
    });
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
                  <Link to="/seguidores">{dataAccount.followers.length} seguidores</Link>
                ) : (
                  <p>Nenhum seguidor</p>
                )}

                {dataAccount.following ? (
                  <Link to="/seguindo">{dataAccount.following.length} seguindo</Link>
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
          
          <div className="postBody">
          {dataPosts.map((item) => item.userInfos.id === dataAccount.id ? (
              <div className="postInfo">
                  <div className="postOwner">
                      <div className="ownerPictureWrapper">
                          <img src={item.userInfos.profilePicture ? item.userInfos.profilePicture : IMAGES.BlankProfilePicture} alt="Profile Icon" />
                      </div>
      
                      <div className="ownerInfo">
                          <h1>{item.userInfos.name}</h1>
                          <h2>{item.userInfos.userType}</h2>
                      </div>
                  </div>
      
                  <div className="postContent">
                      <p>{item.body}</p>
                      {item.imageUrl ? <img src={item.imageUrl} alt="Foto" /> : null}
                  </div>
                  <div className="postInteractions">
                      <div className="postReactions">
                          <button type="button">
                              <img src={IMAGES.HeartIcon} alt="heart icon" />
                              <p>20</p>
                          </button>
                          <button type="button">
                              <img src={IMAGES.CommentIcon} alt="comment icon" />
                              <p>20</p>
                          </button>
                          <button type="button">
                              <img src={IMAGES.SaveIcon} alt="save icon" />
                              <p>20</p>
                          </button>
                      </div>
                      <div className="postType">
                          <img src={IMAGES.HashIcon} alt="hash icon" />
                          <h3>Já testei!</h3>
                      </div>
                  </div>
                  <div className="postComments">
                      <p>
                          <b>@NOME:</b> Amet duis sit cillum est. Consectetur amet excepteur
                          enim dolor quis et do nisi enim. Eiusmod culpa amet eu laboris
                          deserunt. Sit exercitation sunt id est ex ut laboris.
                      </p>
                  </div>
                  <div className="leaveComment">
                      <img src={dataAccount.profilePicture ? dataAccount.profilePicture : IMAGES.BlankProfilePicture} alt="ProfilePic" />
                      <input type="text" placeholder="Deixe um comentário" />
                  </div>
                  <hr />
              </div>
              ) : null)}
            </div>
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