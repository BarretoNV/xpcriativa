import React from 'react';
import './styles.scss';
import Ballons from '../../../images/ballons.png';

function login() {
    return (
        <div className="loginBody">
            <section>
                <img src={Ballons} alt="Ballons"/>
                <form>
                    <input type="text" placeholder="Email:"></input>
                    <input type="password" placeholder="Senha:"></input>
                    <button type="button" onclick="">Entrar</button>
                </form>
            </section>
        </div>
    )
}

export default login;