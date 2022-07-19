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
    const [path, setPath] = useState('');

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        let firebaseRef = firebase.database().ref('users/');

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                let temp = Object.keys(data).map((key) => data[key]);
                setData(temp);
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

    return (
        <h1>{dataUser.name}</h1>
    )

}