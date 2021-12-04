import React from 'react';
import './styles.scss';
import IMAGES from '../../../images/images.js';

function login() {
    return (
        <div className="loginBody">
            <section>
                <img src={IMAGES.Ballons} alt="Ballons"/>
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