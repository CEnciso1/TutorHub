import {auth, googleProvider} from '../database-config/firebase'
import {signInWithPopup} from 'firebase/auth'


export default function Auth(){

    const signIn = async () => {
        try{
            await signInWithPopup(auth, googleProvider)
        }catch(error){
            console.log('Error')
        }
    }

    return(
        <div>
            <button class="btn btn-primary btn-lg" onClick={signIn}>Sign in with Google</button>
        </div>
    )
}