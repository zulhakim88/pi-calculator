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
import { ChildrenElement, RegisterUserAttribute, LoginUserAttribute } from '../lib/types'
import { setUserAsFreeUser } from '../services/api'
import { LoadingSpinnerPage } from '../assets/svg'

interface AuthStateContext {
    user: FirebaseUser | null,
    isPaidUser: boolean,
    setIsPaidUser: React.Dispatch<React.SetStateAction<boolean>>,
    registerUser: ({ firstName, lastName, email, password }: RegisterUserAttribute) => Promise<FirebaseUserCredential>
    login: ({ email, password }: LoginUserAttribute) => Promise<FirebaseUserCredential>
    logout: () => Promise<void>
}

const UserContext = createContext({} as AuthStateContext)

export const AuthContextProvider = ({ children }: ChildrenElement) => {
    const [user, setUser] = useState<FirebaseUser | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [isPaidUser, setIsPaidUser] = useState<boolean>(false)

    const registerUser = async ({ firstName, lastName, email, password }: RegisterUserAttribute) => {
        try {
            const createdUser = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(createdUser.user, { displayName: `${firstName} ${lastName}` })
            const idToken = await createdUser.user.getIdTokenResult(true)
            localStorage.setItem("token", `Bearer ${idToken.token}`)
            const isPaidUser = await setUserAsFreeUser()
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

    const login = async ({ email, password }: LoginUserAttribute) => {
        try {
            const signInUser = await signInWithEmailAndPassword(auth, email, password)
            const idToken = await signInUser.user.getIdToken()
            localStorage.setItem("token", `Bearer ${idToken}`)
            const decodedToken = await signInUser.user.getIdTokenResult()
            const isPaidUser = decodedToken.claims.paiduser ? decodedToken.claims.paiduser : false
            setIsPaidUser(isPaidUser as boolean)
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
                    <LoadingSpinnerPage />
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


