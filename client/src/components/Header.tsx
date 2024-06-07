import { FaRocket } from "react-icons/fa"
import { useUserAuth } from "../context/AuthContext"
import { nameInitial } from "../util"
import { useNavigate } from "react-router-dom"

const Header = (): JSX.Element => {
	const { user, logout } = useUserAuth()
	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			await logout()
			navigate("/signin")
		} catch (e: any) {
			console.log(e.code)
		}
	}

	return (
		<div className="flex w-screen items-center justify-between bg-gray-100 p-3 shadow-md">
			<div className="flex flex-row items-center">
				<button className="rounded-md bg-purple-700 p-3 text-white">
					<FaRocket className="h-7 w-7" />
				</button>
				<div className="mx-4 text-lg font-bold">PI Calculator</div>
			</div>
			<div className="flex flex-row items-center">
				<button onClick={handleLogout} className="mx-2 cursor-pointer text-center text-blue-400">
					Logout
				</button>
				<button className="flex h-14 w-14 cursor-pointer items-center rounded-full bg-green-600 p-4 text-lg font-bold text-white">
					{nameInitial(user && user.displayName)}
				</button>
			</div>
		</div>
	)
}

export default Header
