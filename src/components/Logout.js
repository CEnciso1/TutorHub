import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"

export default function Logout(){

    
    const {currentUser,logout} = useAuth()
    const navigate = useNavigate()
    

    async function handleLogout(){
        try{
            await logout()
            console.log('Signed out')
            console.log(currentUser)
            navigate('/')
        } catch(error){

        }
    }


    return (
        <div >
            <button class='btn btn-primary' type='button' onClick={handleLogout}>
                Logout
            </button>
        </div>
        
    )
}