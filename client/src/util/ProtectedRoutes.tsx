import { useUserAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { ChildrenElement } from '../lib/types'

const ProtectedRoutes = ({ children }: ChildrenElement): JSX.Element | null => {
    const { user } = useUserAuth()

    if (!user) {
        return <Navigate to="/signin" />
    }
    return children as JSX.Element
}

export default ProtectedRoutes