import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask/lib/react-input-mask.development';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import firebaseConfig from '../../../firebaseConfig.js'

import { Camera, CircleNotch } from 'phosphor-react';

import Sidebar from "../../../components/barralateral";

import IMAGES from '../../../images/images.js';

import './style.scss';

export function EditProfile() {

    const [dataAccount, setDataAccount] = useState([]);
    const [profilePicture, setProfilePicture] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userGender, setUserGender] = useState('');
    const [userType, setUserType] = useState('');

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        phone: '',
        birthDate: '',
        description: '',
    })

    useEffect(() => {

        window.scrollTo(0, 0);

        const userEmail = localStorage.getItem('userEmail')

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

        firebase.database().ref('users/').get('/users')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    temp.map((item) => {

                        if (item.email === userEmail) {
                            setDataAccount(item)
                        }

                        return 0;

                    })

                } else {
                    console.log("No data available");
                }
            })

    }, []);

    function handleInputRegisterChange(event) {

        const { name, value } = event.target

        setRegisterData({

            ...registerData, [name]: value

        })

    }

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

    function handleSelectedGender(event) {

        setUserGender(event.target.value)

    }

    function handleSelectedType(event) {

        setUserType(event.target.value)

    }

    function updateRegister() {

        const user = firebase.auth().currentUser;

        if(registerData.email) {

            user.updateEmail(registerData.email).then(() => {

                localStorage.setItem('userEmail',registerData.email)
            
            }).catch((error) => {
              
                if(error) {

                    window.alert("Ocorreu um erro ao atualizar seu e-mail. Tente novamente")

                }

            });
            
        }

        firebase.database().ref('users/' + dataAccount.id).update({

            id: dataAccount.id,
            name: registerData.name !== '' ? registerData.name : dataAccount.name,
            description: registerData.description !== '' ? registerData.description : dataAccount.description,
            birthDate: registerData.birthDate !== '' ? registerData.birthDate : dataAccount.birthDate,
            email: registerData.email !== '' ? registerData.email : dataAccount.email,
            phone: registerData.phone !== '' ? registerData.phone : dataAccount.phone,
            userGender: userGender !== '' ? userGender : dataAccount.userGender,
            userType: userType !== '' ? userType : dataAccount.userType,
            profilePicture: profilePicture !== '' ? profilePicture : dataAccount.profilePicture,

        })
            .then(() => alert("Conta atualizada com sucesso!"))
            .catch((error) => {
                console.log(error);
            });

    }

    return (

        <div className="editProfileBody">
            <Sidebar />

            <section className="editProfileSection">

                <form>

                    <div className="editInfosWrapper">

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

                        <input type="text" name="name" placeholder="Nome Completo" onChange={handleInputRegisterChange}/>
                        <textarea name="description" id="description" rows="4" placeholder="Descrição do perfil" onChange={handleInputRegisterChange}/>
                        <input type="email" name="email" placeholder="Email" onChange={handleInputRegisterChange} />
                        <InputMask mask="99/99/9999" maskPlaceholder="-" name="birthDate" placeholder="Data de nascimento" onChange={handleInputRegisterChange} />
                        <InputMask mask="(99) 99999-9999" maskPlaceholder="" type="text" name="phone" placeholder="Celular" onChange={handleInputRegisterChange}/>

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

                </form>

                <button onClick={() => updateRegister()}>Alterar dados</button>

            </section>
        </div>

    )

}
