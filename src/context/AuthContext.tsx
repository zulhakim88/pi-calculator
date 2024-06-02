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
import { ChildrenElement } from '../lib/types'

interface AuthStateContext {
    user: FirebaseUser | null,
    registerUser: ({ email, password }: { email: string, password: string }) => Promise<FirebaseUserCredential>
    login: ({ email, password }: { email: string, password: string }) => Promise<FirebaseUserCredential>
    logout: () => Promise<void>
}

const UserContext = createContext({} as AuthStateContext)

export const AuthContextProvider = ({ children }: ChildrenElement) => {
    const [user, setUser] = useState<FirebaseUser | null>(null)

    const registerUser = async ({ email, password }: { email: string, password: string }) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            throw error
        }
    }

    const login = async ({ email, password }: { email: string, password: string }) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            throw error
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


