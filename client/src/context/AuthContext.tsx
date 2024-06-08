import { createContext, useContext, useEffect, useState } from "react"
import {
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User as FirebaseUser,
	AuthErrorCodes,
} from "firebase/auth"
import { auth } from "../config/firebase"
import { ChildrenElement, RegisterUserAttribute, LoginUserAttribute } from "../lib/types"
import { LoadingSpinnerPage } from "../assets/svg"
import { router } from "../main"

interface AuthStateContext {
	user: FirebaseUser | null
	displayName: string
	isPaidUser: boolean
	setIsPaidUser: React.Dispatch<React.SetStateAction<boolean>>
	registerUser: ({ firstName, lastName, email, password }: RegisterUserAttribute) => Promise<void>
	login: ({ email, password }: LoginUserAttribute) => Promise<void>
	logout: () => Promise<void>
}

const UserContext = createContext({} as AuthStateContext)

export const AuthContextProvider = ({ children }: ChildrenElement) => {
	const [user, setUser] = useState<FirebaseUser | null>(null)
	const [displayName, setDisplayName] = useState<string>("")
	const [loading, setLoading] = useState<boolean>(true)
	const [isPaidUser, setIsPaidUser] = useState<boolean>(false)

	const registerUser = async ({ firstName, lastName, email, password }: RegisterUserAttribute) => {
		try {
			setDisplayName(`${firstName} ${lastName}`)
			const createdUser = await createUserWithEmailAndPassword(auth, email, password)
			await updateProfile(createdUser.user, { displayName: `${firstName} ${lastName}` })
		} catch (error: any) {
			if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
				throw new Error("The Email has been registered!")
			} else if (error.code === AuthErrorCodes.INVALID_EMAIL) {
				throw new Error("Invalid Email!")
			} else if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
				throw new Error("Password should atleast be 6 characters long!")
			} else {
				throw new Error(error.message)
			}
		}
	}

	const login = async ({ email, password }: LoginUserAttribute) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
		} catch (error: any) {
			if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
				throw new Error("Invalid User!")
			}
			if (error.code === AuthErrorCodes.INVALID_EMAIL) {
				throw new Error("Invalid User!")
			}
			if (error.code === AuthErrorCodes.NETWORK_REQUEST_FAILED) {
				throw new Error("Service is temporarily unavailable!")
			}
			if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
				throw new Error("Password should atleast be 6 characters long!")
			}
			throw new Error(error.message)
		}
	}

	const logout = async () => {
		try {
			localStorage.clear()
			return await signOut(auth)
		} catch (error) {
			throw error
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			localStorage.clear()
			const tokenDetails = await currentUser?.getIdTokenResult(true)
			localStorage.setItem("token", tokenDetails?.token ? `Bearer ${tokenDetails?.token}` : "")
			setIsPaidUser(tokenDetails?.claims.paiduser as boolean)
			setLoading(false)
			setUser(currentUser)
			if (currentUser && currentUser.displayName) {
				setDisplayName(currentUser.displayName)
			}
			router.navigate("/")
		})
		return () => {
			unsubscribe()
		}
	}, [])

	if (loading) {
		return (
			<div className="h-screen bg-sky-100">
				<div className="flex h-full items-center justify-center">
					<LoadingSpinnerPage />
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		)
	}

	return (
		<UserContext.Provider
			value={{ registerUser, user, displayName, setIsPaidUser, logout, login, isPaidUser }}
		>
			{children}
		</UserContext.Provider>
	)
}
export const useUserAuth = () => {
	return useContext(UserContext)
}
