import React, { useState } from 'react'
import {
  Link,
  Navigate,
  useNavigate
} from 'react-router-dom'
import { UserAttribute } from '../lib/types'
import { UserAuth } from '../context/AuthContext'

const SignIn = (): JSX.Element => {
  const [loginForm, setLoginForm] = useState<UserAttribute>({ email: "", password: "" })
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const { user, login } = UserAuth()

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
      <div className="flex items-center flex-col justify-center w-[500px] mx-auto p-5 bg-white rounded-lg shadow-md">
        <div className="w-max">
          <h1 className="text-center text-2xl font-bold py-2">
            Sign In!
          </h1>
          <div className="p-2 flex justify-center space-x-1"><p>Don't have an account?</p><Link to="/signup" className="underline text-blue-500"> Sign Up!</Link></div>
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
              <button disabled className="border-blue-400 bg-blue-400 w-full p-4 my-2 text-white cursor-not-allowed rounded-lg">
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
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