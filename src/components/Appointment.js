import { useForm } from "react-hook-form"
import { db } from '../database-config/firebase';
import { updateDoc, doc} from 'firebase/firestore'
import { useState } from "react";
// import './App.css'

export const Appointment = (props) => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) =>{
        add(data)
        // console.log(id)
    }

    const add = async (data) =>{
        let tutorIncrement = props.tutorCurrAppointments
        let studentIncrement = props.studentCurrAppointments

        const str = "Appointment.Appointment"+tutorIncrement
        const studentStr = "Appointment.Appointment"+studentIncrement

        const tutorDoc = doc(db, "tutors", props.tutorID)
        const studentsDoc = doc(db, "students", props.studentID)
    
        console.log(studentIncrement)
        // const newFields = {Appointment :{[str + increment]  : {date: data.date, time:data.time}}}
        await updateDoc(tutorDoc, { [str] : {date: data.date, time:data.time, name:data.name}})
        await updateDoc(tutorDoc, {currAppointments: tutorIncrement+1})

        await updateDoc(studentsDoc, { [studentStr] : {date: data.date, time:data.time, name:props.tutorName}})
        await updateDoc(studentsDoc, {currAppointments: studentIncrement+1})

        window.location.reload(false)
    }

    const updateUser = async (id, age) => { 
    const tutorDoc = doc(db, "users", id)
    const newFields = {age: age+1}
    await updateDoc(tutorDoc, newFields)
  }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input className="name" placeholder="fullname..." type="name" {...register("name")}></input>
            <input type="date" {...register("date")}></input>
            <input type="time" {...register("time")}></input>
            <button>Book</button>
            {console.log(props)}
        </form>
    )
} 