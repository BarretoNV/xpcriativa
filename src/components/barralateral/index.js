import React, { useState, useEffect } from "react";

import IMAGES from "../../images/images.js";
import { GrMenu } from "react-icons/gr";
import { GrFormClose } from "react-icons/gr";

import "./styles.scss";

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig.js'

function Sidebar() {

  const [sidebar, setSideBar] = useState(false);
  const [dataAccount, setDataAccount] = useState([]);

  const showSidebar = () => setSideBar(!sidebar);

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

  return (
    <div className={sidebar ? "sidebarBody active" : "sidebarBody"}>
      <section>
        {sidebar ? (
          <img src={IMAGES.XPLogo} alt="XPLogo" />
        ) : (
          <img src={IMAGES.XPLogoSimple} alt="XPLogo2" />
        )}
        <button onClick={showSidebar}>
          <div className="closeButton">
            <GrFormClose />
          </div>
          <div className="menuButton">
            <GrMenu />
          </div>
        </button>
      </section>
      <div className="body">
        <a href="/feed">
          <img src={IMAGES.HouseIcon} alt="House icon" />
          <p>Feed</p>
        </a>
        <a href="/descobrir">
          <img src={IMAGES.HashIcon} alt="Hash Icon" />
          <p>Descobrir criativo</p>
        </a>
        <a href="/chat">
          <img src={IMAGES.ChatIcon} alt="Chat Icon" />
          <p>Troca de experiências</p>
        </a>
        <a href="/verMelhor">
          <img src={IMAGES.Lupa} alt="Lupa Icon" />
          <p>Para ver melhor</p>
        </a>
        <a href="/profile">
          <img src={dataAccount.profilePicture !== undefined ? dataAccount.profilePicture : IMAGES.BlankProfilePicture} alt="Profile Icon" />
          <p>Perfil</p>
        </a>
      </div>
      <footer>
        <div class="profileNotifications">
          <div class="notificationsPosition">
            <a href="/">
              <img src={IMAGES.BellNotif} alt="bell" />
            </a>
            <a href="/">
              <img src={IMAGES.SavedNotif} alt="saveds" />
            </a>
            <a href="/">
              <img src={IMAGES.TrophyNotif} alt="trophy" />
            </a>
          </div>
        </div>
        <div className="profileResume" onClick={showSidebar}>

          <div className="profileResumePictureWrapper">
            <img src={dataAccount.profilePicture !== undefined ? dataAccount.profilePicture : IMAGES.BlankProfilePicture} alt="Profile Icon" />
          </div>

          <div class="nameAndWork">
            <h2>{dataAccount.name}</h2>
            <h3>Professora</h3>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default Sidebar;
