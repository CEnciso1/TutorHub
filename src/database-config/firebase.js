// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyDnPyWhXjCcq8q83uA0mlDKlYxpWOIYMiU",

  authDomain: "csproject2023-777ff.firebaseapp.com",

  projectId: "csproject2023-777ff",

  storageBucket: "csproject2023-777ff.appspot.com",

  messagingSenderId: "344125912039",

  appId: "1:344125912039:web:28c14956c920342f160342",

  measurementId: "G-NSK9R2VKE0"

};


// if(location.hostname === 'localhost'){
//   firebaseConfig = {
//     databaseURL: 'http://localhost:9000?ns=tutorhub-3cf08'
//   }
// }
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)

