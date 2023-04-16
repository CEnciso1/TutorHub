import { useEffect, useState, useContext, createContext } from "react";
import {auth, googleProvider} from '../database-config/firebase'
import {signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'

const userContext = createContext()

export function useAuth() {
  return useContext(userContext)
}

export function AuthContextProvider ({children}) {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true)

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const createUser = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password); 
    };

    const createUser1 = async (email, password) => {
      const temp = await createUserWithEmailAndPassword(auth, email, password);
    };
    
    const login = (email, password) =>  {
      return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
      return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if(user){
            console.log('user')
            //console.log(user)
            setCurrentUser(user)
            setLoading(false)
          }
          else{
            console.log('no user')
            // console.log(user)
            setCurrentUser(user)
            setLoading(false)
          } 
        });
        
        return unsubscribe
      }, []);
      

    const value = {
      currentUser,
      login,
      createUser,
      createUser1,
      logout
    }

    return (
        <userContext.Provider value={value}>
          {!loading && children}
        </userContext.Provider>
    )
}