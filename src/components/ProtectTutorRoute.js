import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectTutorRoute() {
    const {accountType} = useAuth()

    return (
      accountType === 'tutor'  ? <Outlet/> : <Navigate to='/'/>
    )
}