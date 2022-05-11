import firebase from 'firebase/app'
import 'firebase/auth'

import { useHistory } from "react-router-dom";

export function SignOut() {

    let history = useHistory();

    firebase.auth().signOut()
    localStorage.setItem('userEmail', '')
    history.push('/')

}