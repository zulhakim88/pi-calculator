import React, { useState } from 'react'
import {
  Link,
  Navigate,
  useNavigate
} from 'react-router-dom'
import { UserAttribute } from '../lib/types'
import { useUserAuth } from '../context/AuthContext'
import { LoadingSpinnerBig } from '../assets/svg'

const SignIn = (): JSX.Element => {
  const [loginForm, setLoginForm] = useState<UserAttribute>({ email: "", password: "" })
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const { user, login } = useUserAuth()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    if ((loginForm.email || loginForm.password) === "") {
      setError("One or more fields is empty!")
      setLoading(false)
      return
    }
    try {
      await login(loginForm)
      console.log('Successfully logged in!!')
      setLoading(false)
      navigate('/')
    } catch (error: any) {
      setLoading(false)
      setError(error.message)
    }
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex items-center h-screen bg-sky-100">
      <div className="flex flex-col w-[500px] mx-auto p-5 bg-white rounded-lg shadow-md">
        <div className="flex flex-col">
          <h1 className="text-left text-2xl font-bold py-2">
            Sign In!
          </h1>
          <div className="py-2 flex justify-start space-x-1"><p>Don't have an account?</p><Link to="/signup" className="underline text-blue-500"> Sign Up!</Link></div>
        </div>
        <form onSubmit={handleFormSubmit} className="w-full">
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Email Address</label>
            <input onChange={handleInput} className="border p-3 rounded-lg" type="email" name="email" required />
          </div>
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Password</label>
            <input onChange={handleInput} className="border p-3 rounded-lg" type="password" name="password" required />
          </div>
          {
            loading ?
              <button disabled className="flex items-center justify-center border-blue-400 bg-blue-400 w-full p-4 my-2 text-white cursor-not-allowed rounded-lg">
                <LoadingSpinnerBig />
                Loading...
              </button>
              :
              <button className="border-blue-400 bg-blue-400 hover:bg-blue-600 w-full p-4 my-2 text-white cursor-pointer rounded-lg">Sign in</button>
          }
          {error && <span className="flex justify-center text-red-400">{error}</span>}
        </form>
      </div>
    </div>
  )
}

export default SignIn