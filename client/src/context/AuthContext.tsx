import { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
    UserCredential as FirebaseUserCredential,
    AuthErrorCodes
} from 'firebase/auth'
import { auth } from '../firebase'
import { ChildrenElement, UserAttribute } from '../lib/types'
import { setUserAsFreeUser } from '../services/api'

interface AuthStateContext {
    user: FirebaseUser | null,
    isPaidUser: boolean,
    setIsPaidUser: React.Dispatch<React.SetStateAction<boolean>>,
    registerUser: ({ firstName, lastName, email, password }: UserAttribute) => Promise<FirebaseUserCredential>
    login: ({ email, password }: UserAttribute) => Promise<FirebaseUserCredential>
    logout: () => Promise<void>
}

const UserContext = createContext({} as AuthStateContext)

export const AuthContextProvider = ({ children }: ChildrenElement) => {
    const [user, setUser] = useState<FirebaseUser | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [isPaidUser, setIsPaidUser] = useState<boolean>(false)

    const registerUser = async ({ firstName, lastName, email, password }: UserAttribute) => {
        try {
            const createdUser = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(createdUser.user, { displayName: `${firstName} ${lastName}` })
            const idToken = await createdUser.user.getIdTokenResult(true)
            localStorage.setItem("token", `Bearer ${idToken.token}`)
            const isPaidUser = await setUserAsFreeUser()
            console.log("User Claims after register:", isPaidUser)
            setIsPaidUser(isPaidUser.isPaidUser)
            return createdUser
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

    const login = async ({ email, password }: UserAttribute) => {
        try {
            const signInUser = await signInWithEmailAndPassword(auth, email, password)
            const idToken = await signInUser.user.getIdToken()
            const decodedToken = await signInUser.user.getIdTokenResult()
            const isPaidUser = decodedToken.claims.paiduser ? decodedToken.claims.paiduser : false
            setIsPaidUser(isPaidUser as boolean)
            localStorage.setItem("token", `Bearer ${idToken}`)
            return signInUser
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
            setUser(currentUser)
            setIsPaidUser(tokenDetails?.claims.paiduser as boolean)
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    if (loading) {
        return (
            <div className="h-screen bg-sky-100">
                <div className="flex h-full justify-center items-center">
                    <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-300 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <UserContext.Provider value={{ registerUser, user, setIsPaidUser, logout, login, isPaidUser }}>
            {children}
        </UserContext.Provider>
    )
}
export const useUserAuth = () => {
    return useContext(UserContext)
}


