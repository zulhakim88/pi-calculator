import { useUserAuth } from "../context/AuthContext"
import { ChildrenElementType } from "../types"
import Unauthorize from "../components/Unauthorize"

const ProtectedRoutes = ({ children }: ChildrenElementType): JSX.Element => {
	const { user } = useUserAuth()

	if (!user) {
		return <Unauthorize />
	}
	return <>{children}</>
}

export default ProtectedRoutes
