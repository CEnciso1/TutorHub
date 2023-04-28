import { useForm } from "react-hook-form"
import { db } from '../database-config/firebase';
import { updateDoc, doc} from 'firebase/firestore'
import { useState } from "react";
// import './App.css'

export const Appointment = (id) => {
    const {register, handleSubmit} = useForm();
    const [users, setUsers] = useState([])

    const onSubmit = (data) =>{
        add(id,data)
        console.log(data, id)
        // console.log(id)
        
    }

    const add = async (id,data) =>{
        let increment = id.currAppointments
        // console.log(increment)
        // console.log(id)
        const str = "Appointment.Appointment"+increment
        const userDoc = doc(db, "tutors", id.id)
        // const newFields = {Appointment :{[str + increment]  : {date: data.date, time:data.time}}}
        await updateDoc(userDoc, { [str] : {date: data.date, time:data.time, name:data.name}})
        await updateDoc(userDoc, {currAppointments: increment+1})
        window.location.reload(false)
    }

    const updateUser = async (id, age) => { 
    const userDoc = doc(db, "users", id)
    const newFields = {age: age+1}
    await updateDoc(userDoc, newFields)
  }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input className="name" placeholder="fullname..." type="name" {...register("name")}></input>
            <input type="date" {...register("date")}></input>
            <input type="time" {...register("time")}></input>
            <button>Book</button>
        </form>
    )
} 