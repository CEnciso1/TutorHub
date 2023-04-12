import React,{ useState } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../database-config/firebase";

export default function SignUp(){
    let navigate = useNavigate()
    const {createUser, createUser1, currentUser} = useAuth()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userInfo, setUserInfo] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            createUser1()
            createUserDoc()
        }catch(error){
                    
        } 
    }

    const createUserDoc = async () =>{
        try{
            await setDoc(doc(db, 'students', currentUser.uid),{
                email: email,
                password: password,
                name: {first:firstName, last:lastName}
            })
            console.log('New user')
            navigate('/feed')
        } catch(error){
            console.log(error)
        }
    }

    return(

        <div class='container'>
            {currentUser && currentUser.email}
            <div id='login-form' class='container-sm'>
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label for="inputEmail1">Email address</label>
                        <input type="email" class="form-control" id="inputEmail1" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword1">Password</label>
                        <input type="password" class="form-control" id="inputPassword1" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="first-name" placeholder="First name" onChange={(e) => setFirstName(e.target.value)}/>
                        <input type="text" class="form-control" id="last-name" placeholder="Last name" onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <br/>
        </div>
    )
}