import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import firebaseConfig from '../../../firebaseConfig.js'

import Sidebar from "../../../components/barralateral";

import './style.scss';
import { Link } from 'react-router-dom';

export function Following() {

    const [dataAccount, setDataAccount] = useState([]);

    useEffect(() => {

        window.scrollTo(0, 0);

        const userEmail = localStorage.getItem('userEmail')

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

        firebase.database().ref('users/').get('/users')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    let data = snapshot.val()
                    let temp = Object.keys(data).map((key) => data[key])

                    temp.forEach((item) => {
                        if (item.email === userEmail) {
                            if (item.following) {
                                item.following = Object.keys(item.following).map((key) => item.following[key])
                            }
                            setDataAccount(item)
                        }
                    })

                } else {
                    console.log("No data available");
                }
            })

    }, []);

    function unfollow(user) {
        const confirm = window.confirm(`Deixar de seguir ${user.followedUserName}?`);

        if (confirm) {
            firebase.database().ref('users/').child(`${dataAccount.id}/following/${user.followedUserId}`).remove();
            window.location.reload();
        }
    }

    return (

        <div className="followingBody">
            <Sidebar />

            <section className="followingSection">
                <h1>Seguindo</h1>
                <table className="followingContainer">
                    <tbody>
                        {typeof dataAccount.following === typeof [] ? dataAccount.following.map((following, index) => (
                            <tr key={index}>
                                <td className="followingImgWrapper">
                                    <img src={following.profilePicture} alt="Foto do perfil" />
                                </td>

                                <td className="followingInfo">
                                    <span><Link to={`/usuario/${following.followedUserId}`}>{following.followedUserName}</Link></span>
                                </td>

                                <td><button type="button" onClick={() => unfollow(following)}>Deixar de seguir</button></td>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
            </section>
        </div>

    )

}
