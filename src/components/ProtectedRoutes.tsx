import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }: any) => {
    const { user }: any = UserAuth()
    if (!user) {
        return <Navigate to="/" />
    }
    return children
}

export default ProtectedRoutes