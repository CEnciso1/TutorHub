import React,{ useEffect, useState, Component } from "react"
import '../css/Styles.css'
import styles from '../css/StudentFeed.module.css'
import { useAuth } from "../context/AuthContext"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { doc, getDoc, collection, getDocs, updateDoc} from "firebase/firestore";
import { db } from "../database-config/firebase";
import {Appointment} from "./Appointment.js"

export default function Home(){
    const {currentUser,assignAccountType} = useAuth()
    const [tutors, setTutors] = useState([])
    let userData
    const [email, setEmail] = useState('')
    const [favTutors, setFavTutors] = useState([])
    const docRef = doc(db, "students", currentUser.uid)
    const tutorsCollectionRef = collection(db, "tutors")
    assignAccountType('student')
    const [update, setUpdate] = useState(false)
    const [valid, setValid] = useState(false)
    const [searchName, setSearchName] = useState(false)
    const [searchCourse, setSearchCourse] = useState(false)
    
    useEffect(() => {
        (async () => {
            try{
                console.log(docRef)
                const userDoc = await getDoc(docRef)
                const data = userDoc.data()
                console.log(data)
                userData = data
                console.log('userData')
                console.log(userData)
                setFavTutors([])
                userData.favorites.map (async (favorite) => {
                    const favoriteTutorRef = doc(db, 'tutors', favorite)
                    const favoriteTutorDoc = await getDoc(favoriteTutorRef)
                    const favoriteData = favoriteTutorDoc.data()
                    console.log('favorites')
                    console.log(favoriteData)
                    setFavTutors(oldFav => [...oldFav, favoriteData])
                })

            }catch(error){
                console.log(error)
            }
        })()

        const getTutors = async () => {
            const data = await getDocs(tutorsCollectionRef)
            setTutors(data.docs.map( (doc) => ({...doc.data(), id: doc.id})))
        }
        getTutors()

        }, [update]
    ) 


    const handleSubmit = event => {
        setTutors(tutors.filter( (tutor) => {
            if(searchName) {
                return tutor.name.first.toUpperCase().includes(searchName.toUpperCase()) 
            || tutor.name.last.toUpperCase().includes(searchName.toUpperCase())
            }

            if(searchCourse){
                return tutor.subjects.toUpperCase().includes(searchCourse.toUpperCase())
            }
        }))
        event.preventDefault()
    }

    const handleAddFavorites = async (event, id) => {
        event.preventDefault();
        console.log(id)
        const newFavoriteData = [`tutors/${id}`]
        setUpdate(prevValue => !prevValue)
        await updateDoc(docRef, {
            favorites: firebase.firestore.FieldValue.arrayUnion(id)
        })
    }

    const handleAppointment = async (event, id) => {
        event.preventDefault();
        console.log(id)
        const newFavoriteData = [`tutors/${id}`]
        setUpdate(prevValue => !prevValue)
        await updateDoc(docRef, {
            favorites: firebase.firestore.FieldValue.arrayUnion(id)
        })
    }

    const showAppointment = () =>{
        setValid(!valid)
    }

    // const showSearchResult = (name, course) => {
        
    // }

    return (
            <div class='container'>
                <div class='welcome-header'>
                    <h1>Hello {userData && userData.name.first}, welcome to TutorHub</h1>
                    <p>Search for a tutor that best matches your learning needs</p>
                    <form class='tutor-search-form'action='/' method="POST">
                        <input id='name' class="form-control" placeholder="Name" name='name' type='text' onChange={(e) => setSearchName(e.target.value)}/>
                        <br/>
                        <input id='major' class="form-control" placeholder="Major" name='major' type='major' onChange={(e) => setSearchCourse(e.target.value)}/>
                        <br/>
                        <button class="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
                <h1>Your Tutors</h1>
                <div className={styles.searchResults}>
                    {tutors.map ( (tutor) => {
                            return (
                                <div class='card' className={styles.tutorCard}>
                                    <h1> {tutor.name.first} {tutor.name.last}</h1>
                                    <p> {tutor.aboutme} </p>
                                    <p>Area of Experties: {tutor.subjects}</p>
                                    <button placeholder='Add to favorites'type='button' class='btn btn-outline-primary btn-sm' onClick={(event) => handleAddFavorites(event, tutor.id)}>add to favorites</button>
                                    <button onClick={showAppointment} className='book-btn'>book Appointment</button>
                                    {valid && <Appointment id={tutor.id} currAppointments={tutor.currAppointments}/>}
                                </div>
                                )
                    })}
                </div>
                <div class='student-content' className={styles.studentContent}>
                    <div class='container' className={styles.favoriteTutors}>
                        <h1>Your favorite tutors</h1>
                        {favTutors &&
                            favTutors.map ( (favorite) =>{
                                return(
                                    <div class='card' className={styles.tutorCard}>
                                        <h1> {favorite.name.first} </h1>
                                        <h1> {favorite.email} </h1>
                                    </div>
                                )
                            })
                        }
                            
                    </div>

                </div>
            </div>
        )
}
