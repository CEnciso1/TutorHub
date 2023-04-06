import React,{ useState, Component } from "react"
import {Navbar, Container, Nav, Button} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import styles from '../css/Login.module.css'
import Auth from './Auth'
export default function Login(){

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        console.log(email, password)
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
            <button type="submit" class="btn btn-primary" onClick={toggleButton}>Login with email</button>
            <div id='login-form'>
                <form>
                    <div class="form-group">
                        <label for="inputEmail1">Email address</label>
                        <input type="email" class="form-control" id="inputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword1">Password</label>
                        <input type="password" class="form-control" id="inputPassword1" placeholder="Password"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <br/>
            <Auth/>
        </div>
    )
}