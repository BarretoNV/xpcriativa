import React from 'react';
import './styles.scss';


function login() {
    return (
        <div className="loginBody">
            <section>
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