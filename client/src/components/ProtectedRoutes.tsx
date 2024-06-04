import { UserAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { ChildrenElement } from '../lib/types'

const ProtectedRoutes = ({ children }: ChildrenElement) => {
    console.log("Protected Routes Render!")
    const { user } = UserAuth()

    console.log("User in Protected routes:", children)
    if (!user) {
        return <Navigate to="/signin" />
    }
    return children
}

export default ProtectedRoutes