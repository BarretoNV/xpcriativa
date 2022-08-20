import React, { useEffect, useState } from "react";

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig.js';

import "./style.scss";
import IMAGES from "../../images/images.js";

export function PostBody() {

    const [dataAccount, setDataAccount] = useState([]);
    const [dataPosts, setDataPosts] = useState([]);

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

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    
        let firebaseRef = firebase.database().ref('posts/');
    
        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                let temp = Object.keys(data).map((key) => data[key]);
                setDataPosts(temp.reverse());
            } else {
                console.log('No data available');
            }
        });
    }, []);

    return (
        <div className="postBody">
            {dataPosts.map((item) => {
                    return (
                    <div className="postInfo">
                        <div className="postOwner">
                            <div className="ownerPictureWrapper">
                                <img src={item.userInfos.profilePicture ? item.userInfos.profilePicture : IMAGES.BlankProfilePicture} alt="Profile Icon" />
                            </div>
            
                            <div className="ownerInfo">
                                <h1>{item.userInfos.name}</h1>
                                <h2>{item.userInfos.userType}</h2>
                            </div>
                        </div>
            
                        <div className="postContent">
                            <p>{item.body}</p>
                            {item.imageUrl ? <img src={item.imageUrl} alt="Foto" /> : null}
                        </div>
                        <div className="postInteractions">
                            <div className="postReactions">
                                <button type="button">
                                    <img src={IMAGES.HeartIcon} alt="heart icon" />
                                    <p>20</p>
                                </button>
                                <button type="button">
                                    <img src={IMAGES.CommentIcon} alt="comment icon" />
                                    <p>20</p>
                                </button>
                                <button type="button">
                                    <img src={IMAGES.SaveIcon} alt="save icon" />
                                    <p>20</p>
                                </button>
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
                            <img src={dataAccount.profilePicture ? dataAccount.profilePicture : IMAGES.BlankProfilePicture} alt="ProfilePic" />
                            <input type="text" placeholder="Deixe um comentário" />
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    );
}