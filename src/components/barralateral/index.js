import React, { useState } from "react";
import "./styles.scss";
import IMAGES from "../../images/images.js";
import { GrMenu } from "react-icons/gr";
import { GrFormClose } from "react-icons/gr";

function Sidebar() {
  const [sidebar, setSideBar] = useState(false);

  const showSidebar = () => setSideBar(!sidebar);

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
          <img src={IMAGES.ProfileIcon} alt="Profile Icon" />
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
        <div class="profileResume">
          <img src={IMAGES.ProfilePic} alt="Profile Icon" />
          <div class="nameAndWork">
            <h2>@NOME</h2>
            <h3>Professora</h3>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Sidebar;
