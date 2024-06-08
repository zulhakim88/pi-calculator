import { FaRocket } from "react-icons/fa"
import { useUserAuth } from "../context/AuthContext"
import { nameInitial } from "../util"
import { useNavigate } from "react-router-dom"

interface HeaderPropType {
	displayName: string
}

const Header = ({ displayName }: HeaderPropType): JSX.Element => {
	const { logout } = useUserAuth()
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
				<div className="inline-block h-14 w-14 cursor-pointer rounded-full bg-green-600 p-4 text-lg font-bold text-white">
					<span className="ml-[50%] mt-[50%] inline-block -translate-x-1/2 -translate-y-1/2">
						{nameInitial(displayName)}
					</span>
				</div>
			</div>
		</div>
	)
}

export default Header
