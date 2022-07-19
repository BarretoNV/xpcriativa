import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import firebaseConfig from '../../../firebaseConfig.js'

import Sidebar from "../../../components/barralateral";

import './style.scss';
import { Link } from 'react-router-dom';

export function Followers() {

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
                            if (item.followers) {
                                item.followers = Object.keys(item.followers).map((key) => item.followers[key])
                            }
                            setDataAccount(item)
                        }
                    })

                } else {
                    console.log("No data available");
                }
            })

    }, []);

    return (

        <div className="followersBody">
            <Sidebar />

            <section className="followersSection">
                <h1>Seus seguidores</h1>
                <table className="followerContainer">
                    <tbody>
                        {typeof dataAccount.followers === typeof [] ? dataAccount.followers.map((follower, index) => (
                            <tr>
                                <Link to={`/usuario/${follower.requesterId}`}>
                                    <td className="followerImgWrapper">
                                        <img src={follower.profilePicture} alt="Foto do perfil" />
                                    </td>

                                    <td className="followerInfo">
                                        <span>{follower.requesterName}</span>
                                    </td>
                                </Link>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
            </section>
        </div>

    )

}
