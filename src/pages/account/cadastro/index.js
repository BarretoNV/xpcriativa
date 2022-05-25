import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import InputMask from "react-input-mask";

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import firebaseConfig from '../../../firebaseConfig.js'

import { Camera, CircleNotch } from "phosphor-react";

import './styles.scss';

import IMAGES from '../../../images/images.js';

export function Cadastro() {

    const [userIsLogged, setUserIsLogged] = useState(false);
    const [registerDone, setRegisterDone] = useState(false);
    const [hasFilled, setHasFilled] = useState(false);
    const [userGender, setUserGender] = useState('');
    const [userType, setUserType] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [dataUser, setDataUser] = useState({

        name: '',
        password: '',
        email: '',
        phone: '',
        birthDate: '',

    })

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

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                setUserIsLogged(true)
        });

    }

    useEffect(() => {

        window.scrollTo(0, 0);
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)
        onAuthStateChanged();

    }, []);

    useEffect(() => {

        let hasFilledAllInputs = Object.values(dataUser).every(value => value.length)

        if (hasFilledAllInputs && userGender !== '' && userType !== '') {

            setHasFilled(true)

        } else {

            setHasFilled(false)

        }

    }, [dataUser, userGender, userType])

    function uploadPicture(event) {

        setIsLoading(true);

        const file = event.target.files[0]

        var storageRef = firebase.storage().ref();

        if (file !== undefined) {

            storageRef.child('pictures/' + file.name.trim())
                .put(file)
                .then(snapshot => {
                    snapshot.ref.getDownloadURL()
                        .then(url => setProfilePicture(url))

                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes);
                    if (progress === 1) {
                        setIsLoading(false);
                    }

                });

        } else {

            setIsLoading(false);

        }

    }

    function writeUserData() {

        if (hasFilled) {

            firebase.auth()
                .createUserWithEmailAndPassword(dataUser.email, dataUser.password)
                .then((user) => {

                    const id = firebase.database().ref().child('posts').push().key

                    firebase.database().ref('users/' + id).set({

                        id: id,
                        name: dataUser.name,
                        email: dataUser.email,
                        profilePicture: profilePicture,
                        phone: dataUser.phone,
                        birthDate: dataUser.birthDate,
                        userGender: userGender,
                        userType: userType,
                        description: '',

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

                        <div className="infosWrapper">

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
                                <option value="Professor">Professor</option>
                                <option value="Coordenador">Diretor/Coordenador</option>
                                <option value="Aluno">Aluno</option>
                                <option value="Interessado">Interessado</option>
                                <option value="Outro">Outro</option>
                            </select>

                        </div>

                        <div className="profilePictureField">

                            <div className="profilePictureWrapper">

                                <label for="profilePicture" />
                                {profilePicture !== '' ? <img src={profilePicture} alt="" /> : <img src={IMAGES.BlankProfilePicture} alt="" />}
                                {isLoading ? <CircleNotch id="loading" /> : <Camera id="loaded" />}

                            </div>

                            <input
                                type='file'
                                onChange={uploadPicture}
                                accept="image/png, image/jpeg"
                                id="profilePicture"
                            />

                        </div>

                    </form>

                    <button type="button" onClick={() => { writeUserData() }}>Cadastrar</button>

                </section>
            </div>
        )

    }

}