// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAqIqCzuE93JuSz9CQYy9uvzH27H16bub8",
  authDomain: "tutorhub-3cf08.firebaseapp.com",
  projectId: "tutorhub-3cf08",
  storageBucket: "tutorhub-3cf08.appspot.com",
  messagingSenderId: "361006099140",
  appId: "1:361006099140:web:c0440d761e6fd84a02f791",
  measurementId: "G-K3CNLBXYTN"
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

