import React from 'react'
import { FaRocket } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext'
import { nameInitial } from '../util'

const Header = () => {
    const { user } = UserAuth()

    return (
        <div className="absolute w-screen flex bg-gray-100 p-3 justify-between items-center shadow-md">
            <div className="flex flex-row items-center">
                <button className="p-3 bg-purple-700 text-white rounded-md">
                    <FaRocket className="h-7 w-7" />
                </button>
                <div className="mx-4 font-bold">PI Calculator</div>
            </div>
            <div className="flex flex-row items-center">
                <button className="flex justify-center bg-sky-500 rounded-full p-4 text-white mx-2 h-13 w-13 text-center font-bold cursor-pointer">{nameInitial(user && user.displayName)}</button>
            </div>
        </div>
    )
}

export default Header