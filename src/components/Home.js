import React,{ useEffect, useState, Component } from "react"
import axios from 'axios'
import '../css/Styles.css'
import {db} from '../database-config/firebase'
import {getDoc} from 'firebase/firestore'
export default function Home(){

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [userInfo, setUserInfo] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        console.log(username, email)
    }

    useEffect(() => {
        try{
            const getUserInfo = async () => {

            }
        } catch(error){
            console.log('Error')
        }
    }, [])


    return (
        <div class='root'>
            <div class='container'>
                <div class='welcome-header'>
                    <h1>Hello Chris, welcome to TutorHub</h1>
                    <p>Search for a tutor that best matches your learning needs</p>
                    <form class='tutor-search-form'action='/login' method="POST">
                        <input id='name' class="form-control" placeholder="Name" name='name' type='text' onChange={(e) => setEmail(e.target.value)}/>
                        <br/>
                        <input id='major' class="form-control" placeholder="Major" name='major' type='major' onChange={(e) => setEmail(e.target.value)}/>
                        <br/>
                        <button class="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
                <div class='student-content'>
                    <h1>Your favorite tutors</h1>


                </div>
            </div>
        </div>
        )
}
