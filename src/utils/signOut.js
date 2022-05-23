import firebase from 'firebase/app'
import 'firebase/auth'

export default function SignOut() {

    firebase.auth().signOut()
    localStorage.setItem('userEmail', '')

}