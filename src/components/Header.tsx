import { FaRocket } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext'
import { nameInitial } from '../util'
import { useNavigate } from 'react-router-dom'

const Header = (): JSX.Element => {
    const { user, logout } = UserAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout()
            console.log("Logout Successful")
            navigate('/signin')
        } catch (e: any) {
            console.log(e.code)
        }
    }

    return (
        <div className="w-screen flex bg-gray-100 p-3 justify-between items-center shadow-md">
            <div className="flex flex-row items-center">
                <button className="p-3 bg-purple-700 text-white rounded-md">
                    <FaRocket className="h-7 w-7" />
                </button>
                <div className="mx-4 font-bold text-lg">PI Calculator</div>
            </div>
            <div className="flex flex-row items-center">
                <button onClick={handleLogout} className="mx-2 text-center cursor-pointer text-blue-400">Logout</button>
                <button className="flex justify-center bg-green-600 rounded-full p-4 text-white h-14 w-14 text-center font-bold cursor-pointer">{nameInitial(user && user.displayName)}</button>
            </div>
        </div>
    )
}

export default Header