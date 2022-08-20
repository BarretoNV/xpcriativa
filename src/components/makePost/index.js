import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig.js';

import "./styles.scss";
import IMAGES from "../../images/images.js";

export function MakePost() {

    const [userIsLogged, setUserIsLogged] = useState(false);
    const [dataAccount, setDataAccount] = useState([]);
    const [postMedia, setPostMedia] = useState('');
    const [inputData, setInputData] = useState('');

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

    function uploadPicture(event) {

        const file = event.target.files[0]
        var storageRef = firebase.storage().ref();

        if (file !== undefined) {
        storageRef.child('pictures/' + file.name.trim())
            .put(file)
            .then(snapshot => {
                snapshot.ref.getDownloadURL()
                .then(url => setPostMedia(url))
            });
        }
    }

    function handleInputChange(event) {
        setInputData(event.target.value);
    }

    function createPost() {
        const id = firebase.database().ref().child('posts').push().key;

        const date = new Date();

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        firebase
        .database()
        .ref('posts/' + id)
        .set({
            userInfos: {
                name: dataAccount.name,
                id: dataAccount.id,
                profilePicture: dataAccount.profilePicture,
                userType: dataAccount.userType
            },
            body: inputData,
            imageUrl: postMedia,
            comments: '',
            likes: '',
            saves: '',
            alreadyTested: '',
            date: `${day}/${month}/${year}`,
        })
        .then(() => alert('Post enviado com sucesso'))
        .then(() => window.location.reload());
    }

    if (userIsLogged) {

        return (
        
            <div className="makeAPost">
                <div className="postPic">
                    <img src={dataAccount.profilePicture ? dataAccount.profilePicture : IMAGES.BlankProfilePicture} alt="Profile Icon" />
                </div>

            <div className="postArea">
                <form className="postInput">
                    <fieldset>
                        <textarea 
                            type="text" 
                            name="body" 
                            id="body" 
                            placeholder="Compartilhe sua ideia..." 
                            onChange={handleInputChange}
                        />
                    </fieldset>
                </form>

                <div className="postButton">
                    <input
                        type='file'
                        onChange={uploadPicture}
                        accept="image/png, image/jpeg"
                        id="postImage"
                        style={{display: 'none'}}
                    />
                    
                    <label for="postImage">
                        <img src={IMAGES.Ballons} alt="Ballons" style={{cursor: 'pointer'}} />
                    </label>

                    <button type="submit" onClick={createPost}>Publicar!</button>
                </div>
            </div>
        </div>
        );

    } else {

        return null;

    }
}