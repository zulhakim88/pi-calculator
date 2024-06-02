import { UserAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { ChildrenElement } from '../lib/types'

const ProtectedRoutes = ({ children }: ChildrenElement) => {
    const { user } = UserAuth()
    if (!user) {
        return <Navigate to="/" />
    }
    return children
}

export default ProtectedRoutes