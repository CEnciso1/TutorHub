import React,{ useEffect, useState, Component } from "react"
import '../css/Styles.css'
import { useAuth } from "../context/AuthContext"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../database-config/firebase";

export default function Home(){
    const {currentUser,assignAccountType} = useAuth()
    const [userData, setUserData] = useState()
    const [email,setEmail] = useState('')
    assignAccountType('student')
    
    useEffect(() => {
        (async () => {
            const docRef = doc(db, "students", currentUser.uid)
            try{
                const userDoc = await getDoc(docRef)
                const data = userDoc.data()
                setUserData(data)
                console.log(data)
                console.log(currentUser.uid)
            }catch(error){
                console.log(error)
            }
        })()
        }, []
    )   


    const handleSubmit = event => {
        event.preventDefault()
    }

    return (
            <div class='container'>
                <div class='welcome-header'>
                    <h1>Hello {userData && userData.name.first}, welcome to TutorHub</h1>
                    <p>Search for a tutor that best matches your learning needs</p>
                    <form class='tutor-search-form'action='/' method="POST">
                        <input id='name' class="form-control" placeholder="Name" name='name' type='text' onChange={(e) => setEmail(e.target.value)}/>
                        <br/>
                        <input id='major' class="form-control" placeholder="Major" name='major' type='major' onChange={(e) => setEmail(e.target.value)}/>
                        <br/>
                        <button class="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
                <div class='student-content'>
                    <h1>Your favorite tutors</h1>
                    <div></div>

                </div>
            </div>
        )
}
