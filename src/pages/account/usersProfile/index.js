import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../../firebaseConfig.js'

import "./styles.scss";

import { PostBody } from "../../../components/Post/index.js";
import Sidebar from "../../../components/barralateral";

import IMAGES from '../../../images/images.js';

export function UsersProfile() {
    const idUser = useParams().idUser;

    const [data, setData] = useState([]);
    const [dataUser, setDataUser] = useState({});
    const [dataAccount, setDataAccount] = useState([]);
    const [path, setPath] = useState('');
    const [dataPosts, setDataPosts] = useState([]);

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        const userEmail = localStorage.getItem('userEmail')
        let firebaseRef = firebase.database().ref('users/');

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                let temp = Object.keys(data).map((key) => data[key]);
                setData(temp);
                temp.map((item) => {
                    if (item.email === userEmail) {
                        setDataAccount(item)
                    }
                })
            } else {
                console.log('No data available');
            }
        });
    }, []);

    useEffect(() => {
        setPath(idUser);
    }, [idUser]);

    useEffect(() => {
        data.map((user) => {
            if (user.id === path) {
                setDataUser(user);
            }
        });
    }, [data]);

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

        <div className="userBody">
            <Sidebar />
            <section className="userSection">
            <div className="userMain">
                <main>
                <div className="userInfos">
                    <div className="userResume">
    
                    <div className="userResumeImgWrapper">
                        <img src={dataUser.profilePicture ? dataUser.profilePicture : IMAGES.BlankProfilePicture} alt="Profile Icon" />
                    </div>
    
                    <div className="nameAndWork">
                        <h2>{dataUser.name}</h2>
                        <h3>{dataUser.userType}</h3>
                    </div>
    
                    </div>
                    <div className="userDescription">
                    <p>
                        {dataUser.description ? dataUser.description : `Sem descrição` }
                    </p>
                    </div>
                </div>
                </main>
            </div>
            
            <div className="postBody">
                {dataPosts.map((item) => item.userInfos.id === dataUser.id ? (
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
                    ) : null)}
            </div>
            </section>
        </div>
    )
}