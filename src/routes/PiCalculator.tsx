import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const PiCalculator = (): JSX.Element => {
  const { user, logout } = UserAuth()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      console.log("Logout Successful")
      navigate('/')
    } catch (e: any) {
      console.log(e.code)
    }
  }
  return (
    <div className="flex items-center flex-col justify-center h-screen max-w-[500px] mx-auto p-4">
      <h1 className="text-center text-2xl font-bold py-2">Welcome {user && user.displayName}!</h1>
      <button onClick={handleLogout} className="border-blue-400 bg-blue-400 hover:bg-blue-600 w-full p-4 my-2 text-white cursor-pointer rounded-lg">Logout</button>
    </div>

  )
}

export default PiCalculator