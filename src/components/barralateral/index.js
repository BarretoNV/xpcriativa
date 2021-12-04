import React from 'react';
import './styles.scss';
import IMAGES from '../../images/images.js';

function Sidebar() {
    return (
        <div className="sidebarBody">
            <section>
                <img src={IMAGES.XPLogo} alt="XPLogo"/>
            </section>
            <body>
                <a href="/feed">
                    <img src={IMAGES.HouseIcon} alt="House icon"/>
                    Feed
                </a>
                <a href="/descobrir">
                    <img src={IMAGES.HashIcon} alt="Hash Icon"/>
                    Descobrir criativo
                </a>
                <a href="/chat">
                    <img src={IMAGES.ChatIcon} alt="Chat Icon"/>
                    Troca de experiências
                </a>
                <a href="/awards">
                    <img src={IMAGES.TrophyIcon} alt="Trophy Icon"/>
                    Recompensas
                </a>
                <a href="/profile">
                    <img src={IMAGES.ProfileIcon} alt="Profile Icon"/>
                    Perfil
                </a>
            </body>
            <footer>
                <div class="profileResume">
                    <img src={IMAGES.ProfilePic} alt="Profile Icon"/>
                    <div class="nameAndWork">
                        
                        <h2>@NOME</h2>
                        <h3>Professora</h3>

                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Sidebar;