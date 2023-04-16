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
    const [loading, setLoading] = useState(false)

    const handleStudentSubmit = async () => {
        const userCredentials = await createUser(email,password)
        await setDoc(doc(db, 'students', userCredentials.user.uid),{
            email: email,
            password: password,
            name: {first:firstName, last:lastName}
        })
        console.log('New user')
        navigate('/studentfeed')  
        
        setLoading(false)
    }

    const handleTutorSubmit = async (e) => {
        e.preventDefault()
        const userCredentials = await createUser(email,password)
        await setDoc(doc(db, 'tutors', userCredentials.user.uid),{
            email: email,
            password: password,
            name: {first:firstName, last:lastName}
        })
        console.log('New user')
        navigate('/tutorfeed')  
        
        setLoading(false)
    }

    const toggleStudentButton = () => {
        var x = document.getElementById("student-signUp-form");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    }

    const toggleTutorButton = () => {
        var x = document.getElementById("tutor-signUp-form");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    }

    

    return(

        <div class='container'>
            <button type="submit" class="btn btn-primary btn-lg" onClick={toggleStudentButton}>Sign up as Tutor</button>
            <div id='student-signUp-form' class='container-sm'>
                <form onSubmit={handleStudentSubmit}>
                    <div class="form-group">
                        <label for="inputEmail1">Email address</label>
                        <input type="email" class="form-control" id="input-email-1" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword1">Password</label>
                        <input type="password" class="form-control" id="input-password-1" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="first-name-1" placeholder="First name" onChange={(e) => setFirstName(e.target.value)}/>
                        <input type="text" class="form-control" id="last-name-1" placeholder="Last name" onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <button type="submit" class="btn btn-primary" disabled={loading}>Submit</button>
                </form>
            </div>
            <br/>
            <button type="submit" class="btn btn-primary btn-lg" onClick={toggleTutorButton}>Sign up as Student</button>
            <div id='tutor-signUp-form' class='container-sm'>
                <form onSubmit={handleTutorSubmit}>
                    <div class="form-group">
                        <label for="inputEmail1">Email address</label>
                        <input type="email" class="form-control" id="input-email-2" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword1">Password</label>
                        <input type="password" class="form-control" id="input-password-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="first-name-2" placeholder="First name" onChange={(e) => setFirstName(e.target.value)}/>
                        <input type="text" class="form-control" id="last-name-2" placeholder="Last name" onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <button type="submit" class="btn btn-primary" disabled={loading}>Submit</button>
                </form>
            </div>
        </div>
    )
}