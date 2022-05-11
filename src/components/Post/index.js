import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig.js';

import "./style.scss";
import IMAGES from "../../images/images.js";

export function PostBody() {

    const [dataAccount, setDataAccount] = useState([]);

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

                        if (item.email === userEmail)
                            setDataAccount(item)

                    })

                } else {
                    console.log("No data available");
                }
            })

    }, []);

    return (

        <div className="postBody">

            <div className="postOwner">

                <div className="ownerPictureWrapper">
                    <img src={dataAccount.profilePicture} alt="Profile Pic" />
                </div>

                <div className="ownerInfo">
                    <h1>{dataAccount.name}</h1>
                    <h2>{dataAccount.userType}</h2>
                </div>

            </div>

            <div className="postContent">
                <p>lorem ipsum dolor sit amet, consectet</p>
                <img src={IMAGES.ExamplePic} alt="example pic" />
            </div>
            <div className="postInteractions">
                <div className="postReactions">
                    <button type="button">
                        <img src={IMAGES.HeartIcon} alt="heart icon" />
                    </button>
                    <p>20</p>
                    <button type="button">
                        <img src={IMAGES.CommentIcon} alt="comment icon" />
                    </button>
                    <p>20</p>
                    <button type="button">
                        <img src={IMAGES.SaveIcon} alt="save icon" />
                    </button>
                    <p>20</p>
                </div>
                <div className="postType">
                    <img src={IMAGES.HashIcon} alt="hash icon" />
                    <h3>Já testei!</h3>
                </div>
            </div>
            <div className="postComments">
                <p>
                    <b>@NOME:</b> Amet duis sit cillum est. Consectetur amet excepteur
                    enim dolor quis et do nisi enim. Eiusmod culpa amet eu laboris
                    deserunt. Sit exercitation sunt id est ex ut laboris.
                </p>
            </div>
            <div className="leaveComment">
                <img src={dataAccount.profilePicture} alt="ProfilePic" />
                <input type="text" placeholder="Deixe um comentário" />
            </div>
        </div>
    )

}
