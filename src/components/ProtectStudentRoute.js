import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectStudentRoute() {
    const {accountType} = useAuth()

    return (
      accountType === 'student'  ? <Outlet/> : <Navigate to='/tutorfeed'/>
    )
}
