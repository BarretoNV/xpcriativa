import React, { useState, useEffect } from 'react';

import { Link, Redirect } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../../firebaseConfig.js'

import './styles.scss';
import IMAGES from '../../../images/images.js';

export function Login() {

    const [userIsLogged, setUserIsLogged] = useState(false);

    const [loginData, setLoginData] = useState({

        email: '',
        password: ''

    })

    function handleInputLoginChange(event) {

        const { name, value } = event.target

        setLoginData({

            ...loginData, [name]: value

        })

    }

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

    function signIn() {

        firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
        .then((userCredential) => {
            
            var user = userCredential.user;
            localStorage.setItem('userEmail', loginData.email)

        })
        .catch((error) => {
            var errorMessage = error.message;
            alert('Ocorreu um erro ao efetuar o login, verifique o nome de usuário e senha e tente novamente!')
        }); 
        
    }

    if (userIsLogged) {

        return (

            <Redirect to='/feed' />

        )

    } else {

        return (
            <div className="loginBody">
                <section>
                    <Link to="/"><img src={IMAGES.Ballons} alt="Ballons" /></Link>
                    <form>
                        <input type="text" name="email" placeholder="Email" onChange={handleInputLoginChange} />
                        <input type="password" name="password" placeholder="Senha" onChange={handleInputLoginChange} />
                        <button type="button" onClick={signIn}>Entrar</button>
                    </form>
                </section>
            </div>
        )
    }
}