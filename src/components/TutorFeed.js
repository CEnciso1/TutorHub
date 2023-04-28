import React,{ useEffect, useState, Component } from "react"
import '../css/Styles.css'
import { useAuth } from "../context/AuthContext"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../database-config/firebase";

export default function TutorFeed(){
    const {currentUser} = useAuth()
    const [userData, setUserData] = useState()
    const [email,setEmail] = useState('')
    
    const load = useEffect(() => {
        (async () => {
            const docRef = doc(db, "tutors", currentUser.uid)
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
        }, [])   


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
                <div class='upcoming-appointments'>
                    <h1>Your Upcoming Appointments</h1>
                    <div className='appointment-body'>
                        {userData && userData.currAppointments && (Object.keys(userData.Appointment)).map( (App) => {
                        return (
                            <div className='appointment-card'>
                            <h4>Name: {userData.Appointment[App].name}</h4>
                            <h3>Date: {userData.Appointment[App].date} </h3>
                            <h3>Time: {userData.Appointment[App].time}</h3>
                            </div>
                        )
                        })}
                    </div>

                </div>
            </div>
        )
}
