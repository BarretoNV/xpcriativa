import React from 'react';
import './styles.scss';

function Sidebar() {
    return (
        <div className="sidebarBody">
            <section>
                <h1>LOGO</h1>
            </section>
            <section>
                <a href="/feed">Feed</a>
                <a href="/descobrir">Descobrir criativo</a>
                <a href="/chat">Troca de experiências</a>
                <a href="/awards">Recompensas</a>
                <a href="/profile">Perfil</a>
            </section>
            <footer>
                <div class="profileResume">
                    <h1>FOTO DE PERFIL</h1>
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