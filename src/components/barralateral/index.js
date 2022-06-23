import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

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

            if (item.email === userEmail) {
              setDataAccount(item)
            }
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
          <a href="/feed"><img src={IMAGES.XPLogo} alt="XPLogo" /></a>
        ) : (
          <a href="/feed"><img src={IMAGES.XPLogoSimple} id="simpleLogo" alt="XPLogo2" /></a>
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
        <Link to="/feed">
          <div className="iconWrapper">
            <img src={IMAGES.HouseIcon} alt="House icon" />
          </div>
          <p>Feed</p>
        </Link>
        <Link to="/descobrir">
          <div className="iconWrapper">
            <img src={IMAGES.HashIcon} alt="Hash Icon" />
          </div>
          <p>Descobrir criativo</p>
        </Link>
        <Link to="/chat">
        <div className="iconWrapper">
          <img src={IMAGES.ChatIcon} alt="Chat Icon" />
        </div>
          <p>Troca de experiências</p>
        </Link>
        <Link to="/verMelhor">
          <div className="iconWrapper">
            <img src={IMAGES.Lupa} alt="Lupa Icon" />
          </div>
          <p>Para ver melhor</p>
        </Link>
        <Link to="/perfil">
          <div className="profileIconWrapper">
            <img src={dataAccount.profilePicture ? dataAccount.profilePicture : IMAGES.BlankProfilePicture} alt="Profile Icon" />
          </div>
          <p>Perfil</p>
        </Link>
      </div>
      <footer>
        <div className="profileNotifications">
          <div className="notificationsPosition">
            <Link to="/">
              <img src={IMAGES.BellNotif} alt="bell" />
            </Link>
            <Link to="/">
              <img src={IMAGES.SavedNotif} alt="saveds" />
            </Link>
          </div>
        </div>
        <div className="profileResume" onClick={showSidebar}>

          <div className="profileResumePictureWrapper">
            <Link to="/perfil"><img src={dataAccount.profilePicture ? dataAccount.profilePicture : IMAGES.BlankProfilePicture} alt="Profile Icon" /></Link>
          </div>

          <div className="nameAndWork">
            <h2>{dataAccount.name}</h2>
            <h3>{dataAccount.userType}</h3>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default Sidebar;
