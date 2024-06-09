import { useUserAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import { ChildrenElementType } from "../lib/types"

const ProtectedRoutes = ({ children }: ChildrenElementType): JSX.Element | null => {
	const { user } = useUserAuth()

	if (!user) {
		return <Navigate to="/signin" />
	}
	return <>{children}</>
}

export default ProtectedRoutes
