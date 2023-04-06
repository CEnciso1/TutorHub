import { useState, useContext, createContext } from "react";
import {auth, googleProvider} from '../database-config/firebase'
import {signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { auth } from '../firebase';

const userContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      };
    
    const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log(currentUser);
          setUser(currentUser);
        });
        return () => {
          unsubscribe();
        };
      }, []);

    return (
        <UserContext.Provider value={{signInWithGoogle, user, signIn, createUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(userContext)
}