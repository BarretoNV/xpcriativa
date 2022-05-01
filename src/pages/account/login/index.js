import React, { useState, useEffect } from 'react';

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { Link, Redirect } from 'react-router-dom';

import './styles.scss';
import IMAGES from '../../../images/images.js';

function Login() {

    const [loginData, setLoginData] = useState({

        email: '',
        password: ''

    })

    const [userIsLogged, setUserIsLogged] = useState(false);

    const auth = getAuth();

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserIsLogged(true)
            }
        });

    });

    function handleInputLoginChange(event) {

        const { name, value } = event.target

        setLoginData({

            ...loginData, [name]: value

        })

    }

    function signIn() {

        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then((userCredential) => {

                let user = userCredential.user;
                localStorage.setItem('userEmail', user.email)

            })
            .catch((error) => {

                if (error) {

                    alert("Ocorreu um erro no seu login, tente novamente")

                }

            });

    }

    if (userIsLogged) {

        return (

            <Redirect to='/' />

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

export default Login;