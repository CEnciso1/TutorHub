import React,{ useState } from "react"
import styles from '../css/Login.module.css'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../database-config/firebase";
import '../css/Signup.module.css'

export default function SignUp(){
    let navigate = useNavigate()
    const {createUser, assignAccountType} = useAuth()
    const [email,setEmail] = useState('')
    const [password1,setPassword1] = useState('')
    const [password2,setPassword2] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [subjecList, setSubjecList] = useState('')
    const [aboutme, setAboutme] = useState('')
    const [loading, setLoading] = useState(false)
    const [accountOption, setAccountOption] = useState('')
    const [credentialsError, setCredentialsError] = useState('')
    
    const handleSubmit = async e => {
        e.preventDefault()

        if(password1 !== password2){
            setCredentialsError('Passwords do not match')
            return
        }

        assignAccountType(accountOption)

        let userCredentials
        try {
            userCredentials = await createUser(email,password1)
        } catch (error) {
            console.log(error)
            console.log(error.message)
            setCredentialsError(error.message)
            return
        }


        if(accountOption === 'student'){
            try{
                await setDoc(doc(db, 'students', userCredentials.user.uid),{
                    email: email,
                    password: password1,
                    name: {first:firstName, last:lastName},
                    currAppointments: 0
                })
                console.log('New user')
                navigate('/studentfeed')
            }catch(error){
                console.log(error)
            }
        }  
        else{
            try{
                await setDoc(doc(db, 'tutors', userCredentials.user.uid),{
                    email: email,
                    password: password1,
                    name: {first:firstName, last:lastName},
                    currAppointments: 0,
                    subjects: subjecList,
                    aboutme: aboutme
                })
                console.log('New user')
                navigate('/tutorfeed')
            }catch(error){
                console.log(error)
            }
        }
        
        setLoading(false)
    }    

    return(

        <div class='container' className={styles.container}>

            <h1>Sign up</h1>

            {credentialsError && 
            <div class="alert alert-warning" role="alert">
                {credentialsError}
            </div>
            }
            <div id='signUp-form' class='container-sm'>
                <h4>Account Type</h4>
                <form onSubmit={handleSubmit}>
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
                    <div class="form-group">
                        <label for="name">Name</label>
                        <div className="form-group-name">
                            <input type="text" class="form-control" id="first-name-1" placeholder="First name" onChange={(e) => setFirstName(e.target.value)}/>
                            <input type="text" class="form-control" id="last-name-1" placeholder="Last name" onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail1">Email address</label>
                        <input type="email" class="form-control" id="input-email-1" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword1">Password</label>
                        <input type="password" class="form-control" id="input-password-1" placeholder="Password" onChange={(e) => setPassword1(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword2">Confirm password</label>
                        <input type="password" class="form-control" id="input-password-2" placeholder="Password" onChange={(e) => setPassword2(e.target.value)}/>
                    </div>
                    { accountOption === 'tutor' && <div>
                        <div class="form-group">
                            <label >Subject List</label>
                            <br/>
                            <sub> (You can enter multiple courses separate by comma) </sub>
                            <br/>
                            <input type='text' onChange={ (event) => setSubjecList(event.target.value)} ></input>
                        </div>
                        <div class="form-group">
                            <label >About Me</label>
                            <br></br>
                            <textarea className="about-me" cols="80" placeholder="Enter Text here..." onChange={ (event) => setAboutme(event.target.value)}></textarea>
                        </div>      
                        <div className="available-hours">
                        <label for="available-hours-select">What Days are you available to Teach? &nbsp;&nbsp;</label>
                            <select name="available-hours-select">
                                <option>Weekdays</option>
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                            </select>
                            <br></br>
                            <label for="available-hours-select">What hourss are you available to Teach?  From: &nbsp; </label>
                            <input type="time" />
                            <label> &nbsp; To : &nbsp; </label>
                            <input type="time" />
                        </div>
                        <div>
                            <label> Please upload a profile pic &nbsp;&nbsp; </label>
                            <input type="file"></input>
                        </div>              
                    </div>}
                    <br></br>                    
                    <button type="submit" class="btn btn-primary" disabled={loading}>Submit</button>
                </form>
            </div>
            <br/>
        </div>
    )
}