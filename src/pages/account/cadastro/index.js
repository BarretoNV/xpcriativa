import React from 'react';
import { useState, useEffect } from 'react';
import { getDatabase, ref, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import app from '../../../firebaseConfig.js';

import InputMask from "react-input-mask";
import { Link, Redirect } from 'react-router-dom';

import './styles.scss';

import IMAGES from '../../../images/images.js';

function Cadastro() {

    const [userIsLogged, setUserIsLogged] = useState(false);
    const [registerDone, setRegisterDone] = useState(false);
    const [hasFilled, setHasFilled] = useState(false);
    const [userGender, setUserGender] = useState('');
    const [userType, setUserType] = useState('');

    const [dataUser, setDataUser] = useState({

        name: '',
        password: '',
        email: '',
        phone: '',
        birthDate: '',

    })

    const auth = getAuth();
    const db = getDatabase(app);

    function handleInputRegisterChange(event) {

        const { name, value } = event.target

        setDataUser({

            ...dataUser, [name]: value

        })

    }

    function handleSelectedGender(event) {

        setUserGender(event.target.value)

    }

    function handleSelectedType(event) {

        setUserType(event.target.value)

    }

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserIsLogged(true)
            }
        });

    });

    useEffect(() => {

        let hasFilledAllInputs = Object.values(dataUser).every(value => value.length)

        if(hasFilledAllInputs && userGender !== '' && userType !== '') {

            setHasFilled(true)

        } else {

            setHasFilled(false)

        }
        
    }, [dataUser, userGender, userType])

    function writeUserData() {

        if (hasFilled) {

            createUserWithEmailAndPassword(auth, dataUser.email, dataUser.password).then((user) => {

                push(ref(db, 'users/'), {

                    name: dataUser.name,
                    email: dataUser.email,
                    phone: dataUser.phone,
                    birthDate: dataUser.birthDate,
                    userGender: userGender,
                    userType: userType,

                });

                localStorage.setItem('userEmail', dataUser.email)

                alert('Cadastro realizado com sucesso!')
                setRegisterDone(true)

            })
            .catch((error) => {

                if (error) {

                    window.alert("Ocorreu um erro no seu cadastro, tente novamente.")
                    console.log(error)

                }

            });

        } else {

            window.alert("Você deve preencher todos os campos.")

        }

    }

    if (userIsLogged) {

        return (

            <Redirect to='/' />

        )

    } else if (registerDone) {

        return (

            <Redirect to='/' />

        )

    } else {

        return (
            <div className="cadastroBody">
                <section>
                    <Link to='/'><img src={IMAGES.Ballons} alt="Ballons" /></Link>
                    <form>
                        <input type="text" name="name" placeholder="Nome Completo" onChange={handleInputRegisterChange} />
                        <input type="email" name="email" placeholder="Email" onChange={handleInputRegisterChange} />
                        <InputMask mask="(99) 99999-9999" maskPlaceholder="" type="text" name="phone" placeholder="Celular" onChange={handleInputRegisterChange} />
                        <input type="password" name="password" minLength="6" placeholder="Senha (6 caracteres no mínimo)" onChange={handleInputRegisterChange} />
                        <InputMask mask="99/99/9999" maskPlaceholder="-" name="birthDate" placeholder="Data de nascimento" onChange={handleInputRegisterChange} />
                        <select name="gender" onChange={handleSelectedGender}>
                            <option disabled selected value=''>Gênero</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Outro">Outro</option>
                        </select>
                        <select name="userType" onChange={handleSelectedType}>
                            <option disabled selected value=''>Eu sou</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Outro">Outro</option>
                        </select>
                        <button type="button" onClick={() => { writeUserData() }}>Cadastrar</button>
                    </form>
                </section>
            </div>
        )

    }

}

export default Cadastro;