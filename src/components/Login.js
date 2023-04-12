import React,{ useState } from "react"
import styles from '../css/Login.module.css'
import Auth from './Auth'
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';

export default function Login(){
    let navigate = useNavigate()
    const {login} = useAuth()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        try{
            await login(email, password)
            console.log('signed in')
            navigate('/feed')
        } catch(error){
            
        }
    }

    const toggleButton = () => {
        var x = document.getElementById("login-form");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    }

    return (
        <div class='container' className={styles.container}>
            <button type="submit" class="btn btn-primary btn-lg" onClick={toggleButton}>Login with email</button>
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
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <br/>
            <Auth/>
        </div>
    )
}