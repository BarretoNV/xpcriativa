import React, { useEffect, useState } from "react";

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig.js';

import "./style.scss";
import IMAGES from "../../images/images.js";

export function PostBody() {

    const [dataAccount, setDataAccount] = useState([]);
    const [dataPosts, setDataPosts] = useState([]);
    const [userComment, setUserComment] = useState('');

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
                temp.forEach((post) => {
                    if (post.comments) {
                        post.comments = Object.keys(post.comments).map((key) => post.comments[key])
                    }

                    if (post.likes) {
                        post.likes = Object.keys(post.likes).map((key) => post.likes[key].likeId)
                    }
                })
                setDataPosts(temp.reverse());
            } else {
                console.log('No data available');
            }
        });
    }, []);

    function writeComment(event) {
        setUserComment(event.target.value);
    }

    function leaveComment(item) {
        const commentId = firebase.database().ref().child('posts').push().key;

        userComment !== '' ? (
            firebase
            .database()
            .ref('posts/' + item.id + '/comments/' + commentId)
            .set({
                    commentId: commentId,
                    comment: userComment,
                    userName: dataAccount.name,
                    profilePicture: dataAccount.profilePicture,
                    userId: dataAccount.id
                })
            .then(() => alert('Comentário adicionado'))
            // .then(() => window.location.reload());
        ) : (window.alert('Digite um comentário!'));
    }

    function setUserLike(item) {
        // const likeId = firebase.database().ref().child('posts').push().key;
        const likeId = 'L' + dataAccount.id;

        if(item.likes && item.likes.includes(likeId)) {
            firebase
            .database()
            .ref('posts/' + item.id + '/likes/' + likeId)
            .remove()
        } else {
            firebase
            .database()
            .ref('posts/' + item.id + '/likes/' + likeId)
            .set({
                likeId: likeId,
                userId: dataAccount.id,
                userName: dataAccount.name
            })
        }
    }

    return (
        <div className="postBody">
            {dataPosts.map((item, index) => {
                    return (
                    <div key={index} className="postInfo">
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
                                <button 
                                    type="button" 
                                    onClick={() => setUserLike(item, index)}>
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
                            {item.comments.length > 0 ? item.comments.map((comment) => {
                                return (
                                    <>
                                        <div className="comment">
                                            <div className="commentOwner">
                                                <div className="ownerPictureWrapper">
                                                    <img src={comment.profilePicture ? comment.profilePicture : IMAGES.BlankProfilePicture} alt="Foto do perfil" />
                                                </div>
                                                <div className="ownerInfo">
                                                    <p><b>{comment.userName}: </b>{comment.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                )
                            }
                            ) : null}
                        </div>
                        <div className="leaveComment">
                            <img src={dataAccount.profilePicture ? dataAccount.profilePicture : IMAGES.BlankProfilePicture} alt="ProfilePic" />
                            <input type="text" placeholder="Deixe um comentário" onChange={writeComment} />
                            <button onClick={() => leaveComment(item, index)}>Comentar</button>
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    );
}