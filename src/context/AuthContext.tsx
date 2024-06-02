import { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
    UserCredential as FirebaseUserCredential,
    AuthErrorCodes
} from 'firebase/auth'
import { auth } from '../firebase'
import { ChildrenElement, FormAttribute } from '../lib/types'

interface AuthStateContext {
    user: FirebaseUser | null,
    registerUser: ({ email, password }: FormAttribute) => Promise<FirebaseUserCredential>
    login: ({ email, password }: FormAttribute) => Promise<FirebaseUserCredential>
    logout: () => Promise<void>
}

const UserContext = createContext({} as AuthStateContext)

export const AuthContextProvider = ({ children }: ChildrenElement) => {
    const [user, setUser] = useState<FirebaseUser | null>(null)

    const registerUser = async ({ email, password }: FormAttribute) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password)
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

    const login = async ({ email, password }: FormAttribute) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password)
        } catch (error: any) {
            if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
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
            return await signOut(auth)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        const checkLoginStatus = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser)
        })
        return () => {
            checkLoginStatus();
        }
    }, [])

    return (
        <UserContext.Provider value={{ registerUser, user, logout, login }}>
            {children}
        </UserContext.Provider>
    )
}
export const UserAuth = () => {
    return useContext(UserContext)
}


