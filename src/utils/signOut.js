// import { getAuth, signOut } from "firebase/auth";
// // import { useHistory } from "react-router-dom";

// export function Logoff() {

//     const auth = getAuth();
//     // let history = useHistory();

//     signOut(auth).then(() => {
//         localStorage.setItem('userEmail', '')
//         alert("Você saiu da sua conta com sucesso!");
//         // history.push('/')
//     }).catch((error) => {
//         alert("Ocorreu um erro ao sair da conta. Tente novamente!")
//     });

// }

// function signOut() {

//     firebase.auth().signOut()
//     localStorage.setItem('userEmail', '')

// }