import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig.js'

import "./styles.scss";
import Sidebar from "../../components/barralateral";
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
              <img src={dataAccount.profilePicture}alt="Profile Pic" />
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
          <div className="postBody">
            <div className="postOwner">
              <img src={dataAccount.profilePicture} alt="Profile Pic" />
              <div className="ownerInfo">
                <h1>{dataAccount.name}</h1>
                <h2>Professora</h2>
              </div>
            </div>
            <div className="postContent">
              <p>lorem ipsum dolor sit amet, consectet</p>
              <img src={IMAGES.ExamplePic} alt="example pic" />
            </div>
            <div className="postInteractions">
              <div className="postReactions">
                <button type="button">
                  <img src={IMAGES.HeartIcon} alt="heart icon" />
                </button>
                <p>20</p>
                <button type="button">
                  <img src={IMAGES.CommentIcon} alt="comment icon" />
                </button>
                <p>20</p>
                <button type="button">
                  <img src={IMAGES.SaveIcon} alt="save icon" />
                </button>
                <p>20</p>
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
              <img src={dataAccount.profilePicture} alt="ProfilePic" />
              <input type="text" placeholder="Deixe um comentário" />
            </div>
          </div>
        </section>
      </div>
    );

  } else {

    return null;

  }

}