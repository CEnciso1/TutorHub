import {auth, googleProvider} from '../database-config/firebase'
import {signInWithPopup} from 'firebase/auth'
import {useState, useNavigate} from 'react'
import { async } from '@firebase/util'


export default function Auth(){
    const navigate = useNavigate()

    const signIn = async () => {
        try{
            await signInWithPopup(auth, googleProvider)
            navigate('/')
        }catch(error){
            console.log('Error')
        }
    }

    return(
        <div>
            <button class="btn btn-primary" onClick={signIn}>Sign in with Google</button>
        </div>
    )
}