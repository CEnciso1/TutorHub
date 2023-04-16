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
    const [accountOption, setAccountOption] = useState('tutor')

    const handleSubmit = async e => {
        e.preventDefault()
        const userCredentials = await createUser(email,password)
        if(accountOption === 'student'){
            await setDoc(doc(db, 'students', userCredentials.user.uid),{
                email: email,
                password: password,
                name: {first:firstName, last:lastName}
            })
            console.log('New user')
            navigate('/studentfeed')
        }  
        else{
            await setDoc(doc(db, 'tutors', userCredentials.user.uid),{
                email: email,
                password: password,
                name: {first:firstName, last:lastName}
            })
            console.log('New user')
            navigate('/tutorfeed')
        }
        
        setLoading(false)
    }

    const toggleButton = () => {
        var x = document.getElementById("signUp-form");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    }

    

    return(

        <div class='container'>
            <button type="submit" class="btn btn-primary btn-lg" onClick={toggleButton}>Sign up</button>
            <div id='signUp-form' class='container-sm'>
                <form onSubmit={handleSubmit}>
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
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="tutorRadio" value='tutor' checked={accountOption === 'tutor'} onChange={(e) => setAccountOption(e.target.value)}/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            Tutor
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="studentRadio" value='student' checked={accountOption === 'student'} onChange={(e) => setAccountOption(e.target.value)}/>
                        <label class="form-check-label" for="flexRadioDefault2">
                            Student 
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary" disabled={loading}>Submit</button>
                </form>
            </div>
            <br/>
        </div>
    )
}