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
    const [accountOption, setAccountOption] = useState('tutor')

    const handleSubmit = async e => {
        e.preventDefault()

        try{
            await login(email, password)
            console.log('signed in')
            if(accountOption == 'student')
                navigate('/studentfeed')
            else 
                navigate('/tutorfeed')
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
                    <h4>Account Type</h4>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="tutorRadio" value='tutor' checked={accountOption == 'tutor'} onChange={(e) => setAccountOption(e.target.value)}/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            Tutor
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="studentRadio" value='student' checked={accountOption == 'student'} onChange={(e) => setAccountOption(e.target.value)}/>
                        <label class="form-check-label" for="flexRadioDefault2">
                            Student 
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <br/>
            <Auth/>
        </div>
    )
}