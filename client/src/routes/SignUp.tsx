import React, { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useUserAuth } from "../context/AuthContext"
import { RegisterUserAttribute } from "../lib/types"
import { LoadingSpinnerBig } from "../assets/svg"

const SignUp = (): JSX.Element => {
	const [registerForm, setRegisterForm] = useState<RegisterUserAttribute>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	})
	const [error, setError] = useState<string>("")
	const [loading, setLoading] = useState<boolean>(false)

	const navigate = useNavigate()
	const { registerUser, user } = useUserAuth()

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegisterForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError("")
		setLoading(true)
		if (
			(registerForm.firstName ||
				registerForm.lastName ||
				registerForm.email ||
				registerForm.password ||
				registerForm.confirmPassword) === ""
		) {
			setError("One or more fields are empty!")
			setLoading(false)
			return
		}
		if (registerForm.password !== registerForm.confirmPassword) {
			setError("Password did not match!")
			setLoading(false)
			return
		}
		try {
			await registerUser(registerForm)
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
					<h1 className="py-2 text-left text-2xl font-bold">Register an account</h1>
					<div className="flex justify-start space-x-1 py-2">
						<p>Already have an account?</p>
						<Link to="/signin" className="text-blue-500 underline">
							Sign in!
						</Link>
					</div>
				</div>
				<form onSubmit={handleFormSubmit} className="w-full">
					<div className="flex flex-row justify-between gap-3">
						<div className="flex w-60 flex-col py-2">
							<label className="py-2 font-medium">First Name</label>
							<input
								onChange={handleInput}
								className="rounded-lg border p-3"
								type="text"
								name="firstName"
								placeholder="First Name..."
							/>
						</div>
						<div className="flex w-60 flex-col py-2">
							<label className="py-2 font-medium">Last Name</label>
							<input
								onChange={handleInput}
								className="rounded-lg border p-3"
								type="text"
								name="lastName"
								placeholder="Last Name..."
							/>
						</div>
					</div>
					<div className="flex flex-col py-2">
						<label className="py-2 font-medium">Email Address</label>
						<input
							onChange={handleInput}
							className="rounded-lg border p-3"
							type="email"
							name="email"
							placeholder="Email..."
						/>
					</div>
					<div className="flex flex-col py-2">
						<label className="py-2 font-medium">Password</label>
						<input
							onChange={handleInput}
							className="rounded-lg border p-3"
							type="password"
							name="password"
							placeholder="Password..."
						/>
					</div>
					<div className="flex flex-col py-2">
						<label className="py-2 font-medium">Confirm Password</label>
						<input
							onChange={handleInput}
							className="rounded-lg border p-3"
							type="password"
							name="confirmPassword"
							placeholder="Confirmed Password..."
						/>
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
							Register
						</button>
					)}
					{error && <span className="flex justify-center text-red-400">{error}</span>}
				</form>
			</div>
		</div>
	)
}

export default SignUp
