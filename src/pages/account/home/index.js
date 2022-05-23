import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../../firebaseConfig.js'

import './styles.scss';
import IMAGES from '../../../images/images.js';

export function Home() {

    const [userIsLogged, setUserIsLogged] = useState(false);

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) 
              setUserIsLogged(true)
          });
        
    }
        
    useEffect(() => {
        
        window.scrollTo(0, 0);

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)
        onAuthStateChanged();

    }, []);

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
                        <Link to="/cadastro" className="buttonCadastro">Se inscreva aqui</Link>

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