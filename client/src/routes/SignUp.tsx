import React, { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useUserAuth } from "../context/AuthContext"
import { RegisterUserAttributeType } from "../lib/types"
import { LoadingSpinnerBig } from "../assets/svg"
import Input from "../components/Input"

const SignUp = (): JSX.Element => {
	const [registerForm, setRegisterForm] = useState<RegisterUserAttributeType>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	})
	const [error, setError] = useState<string>("")
	const [loading, setLoading] = useState<boolean>(false)

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
			!registerForm.firstName ||
			!registerForm.lastName ||
			!registerForm.password ||
			!registerForm.email ||
			!registerForm.confirmPassword
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
						<div className="w-60">
							<Input
								onChange={handleInput}
								type="text"
								name="firstName"
								value={registerForm.firstName}
								label="First Name"
							/>
						</div>
						<div className="w-60">
							<Input
								onChange={handleInput}
								type="text"
								name="lastName"
								value={registerForm.lastName}
								label="Last Name"
							/>
						</div>
					</div>
					<Input
						onChange={handleInput}
						type="email"
						name="email"
						value={registerForm.email}
						label="Email Address"
					/>
					<Input
						onChange={handleInput}
						type="password"
						name="password"
						value={registerForm.password}
						label="Password"
					/>
					<Input
						onChange={handleInput}
						type="password"
						name="confirmPassword"
						value={registerForm.confirmPassword}
						label="Confirm Password"
					/>
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
