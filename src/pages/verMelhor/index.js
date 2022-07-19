import React, { useState, useEffect} from "react";
import "./styles.scss";
import Sidebar from "../../components/barralateral";
import IMAGES from "../../images/images.js";

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig.js';
import { Link } from "react-router-dom";

export function VerMelhor() {

  const [dataProfile, setDataProfile] = useState({});
  const [dataUsers, setDataUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {

    window.scrollTo(0, 0);

    const userEmail = localStorage.getItem('userEmail')
    let userList = []

    if (!firebase.apps.length)
      firebase.initializeApp(firebaseConfig)

    firebase.database().ref('users/').get('/users')
      .then(function (snapshot) {

        if (snapshot.exists()) {

          let data = snapshot.val()
          let temp = Object.keys(data).map((key) => data[key])
          let aux = []

          temp.forEach((item) => {
            if (item.email === userEmail) {
              setDataProfile(item)

              if (Object.keys(item.following)) {
                let followingList = Object.keys(item.following).map((key) => item.following[key])

                followingList.forEach((item) => {
                  aux.push(item.followedUserName)
                })

              }
            }

            if (!aux.includes(item.name)) {
              setDataUsers(dataUsers => [...dataUsers, item]);
            }

          })

        } else {
          console.log("No data available");
        }
      })

  }, []);

  function sendFriendRequest(user) {

    const senderId = dataProfile.id
      
    firebase.database().ref('users/').child(user.id).child('followers/' + senderId).set({
      requesterId: senderId,
      requesterName: dataProfile.name,
      profilePicture: dataProfile.profilePicture
    }).then(() => {
      firebase.database().ref('users/').child(senderId).child('following/' + user.id).set({
        followedUserId: user.id,
        followedUserName: user.name,
        profilePicture: user.profilePicture
      })
    }).then(() => {
      alert('Usuário seguido com sucesso!');
      window.location.reload();
    }).catch((error) => {
      if (error) {
        alert('Desculpe, ocorreu um erro ao seguir o usuário, tente novamente!');
      }
    })
  }

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
              {dataUsers.length && dataUsers.map((user, index) => ( user.id !== dataProfile.id ? 
                (
                  <tr key={index}>
                    <td className="profileImgWrapper"><img src={user.profilePicture ? user.profilePicture : IMAGES.BlankProfilePicture} alt="Profile Icon" /></td>
                    <td><Link to={`/usuario/${user.id}`}><b>{user.name}</b></Link></td>
                    <td><button type="button" onClick={() => sendFriendRequest(user)}>Seguir</button></td>
                  </tr> //fazer um includes com a lista de pessoas q ja segue
                ) : null ))
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}