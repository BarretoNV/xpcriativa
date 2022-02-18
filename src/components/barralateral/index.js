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
        <img src={IMAGES.XPLogo} alt="XPLogo" />
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
        <a href="/awards">
          <img src={IMAGES.TrophyIcon} alt="Trophy Icon" />
          <p>Recompensas</p>
        </a>
        <a href="/profile">
          <img src={IMAGES.ProfileIcon} alt="Profile Icon" />
          <p>Perfil</p>
        </a>
      </div>
      <footer>
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
