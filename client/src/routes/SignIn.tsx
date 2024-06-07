import React, { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { LoginUserAttribute } from "../lib/types"
import { useUserAuth } from "../context/AuthContext"
import { LoadingSpinnerBig } from "../assets/svg"

const SignIn = (): JSX.Element => {
	const [loginForm, setLoginForm] = useState<LoginUserAttribute>({ email: "", password: "" })
	const [error, setError] = useState<string>("")
	const [loading, setLoading] = useState<boolean>(false)

	const navigate = useNavigate()
	const { user, login } = useUserAuth()

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
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
			setLoading(false)
			navigate("/")
		} catch (error: any) {
			setLoading(false)
			setError(error.message)
		}
	}

	if (user) {
		return <Navigate to="/" />
	}

	return (
		<div className="flex h-screen items-center bg-sky-100">
			<div className="mx-auto flex w-[500px] flex-col rounded-lg bg-white p-5 shadow-md">
				<div className="flex flex-col">
					<h1 className="py-2 text-left text-2xl font-bold">Sign In!</h1>
					<div className="flex justify-start space-x-1 py-2">
						<p>Don't have an account?</p>
						<Link to="/signup" className="text-blue-500 underline">
							{" "}
							Sign Up!
						</Link>
					</div>
				</div>
				<form onSubmit={handleFormSubmit} className="w-full">
					<div className="flex flex-col py-2">
						<label className="py-2 font-medium">Email Address</label>
						<input onChange={handleInput} className="rounded-lg border p-3" type="email" name="email" required />
					</div>
					<div className="flex flex-col py-2">
						<label className="py-2 font-medium">Password</label>
						<input onChange={handleInput} className="rounded-lg border p-3" type="password" name="password" required />
					</div>
					{loading ? (
						<button
							disabled
							className="my-2 flex w-full cursor-not-allowed items-center justify-center rounded-lg border-blue-400 bg-blue-400 p-4 text-white"
						>
							<LoadingSpinnerBig />
							Loading...
						</button>
					) : (
						<button className="my-2 w-full cursor-pointer rounded-lg border-blue-400 bg-blue-400 p-4 text-white hover:bg-blue-600">
							Sign in
						</button>
					)}
					{error && <span className="flex justify-center text-red-400">{error}</span>}
				</form>
			</div>
		</div>
	)
}

export default SignIn
