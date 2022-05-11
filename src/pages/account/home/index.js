import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import './styles.scss';
import IMAGES from '../../../images/images.js';

export function Home() {

    const [userIsLogged, setUserIsLogged] = useState(false);

    if (userIsLogged) {

        return (

            <Redirect to="/feed" />

        )
    } else {

        return (
            <div className="homeBody">
                <div className="homeBackground"></div>
                <section>
                    <img src={IMAGES.XPLogo} alt="logoXP" />
                    <nav>
                        <h1>Compartilhando ideias</h1>
                        <h2>A rede social da criatividade.</h2>
                    </nav>
                    <body>
                        <a className="buttonCadastro" href="/cadastro">Se inscreva aqui</a>

                        <h4>
                            Ao se inscrever, você concorda com os Termos de Serviço
                            e a Política de Privacidade, incluindo o Uso de Cookies
                        </h4>

                        <h3>Ja tem uma conta? <a href="/login">Entre</a></h3>
                    </body>
                    <div className="ballonsDiv">
                        <img src={IMAGES.Ballons} alt="Ballons" />
                    </div>
                </section>
            </div>
        )

    }


}