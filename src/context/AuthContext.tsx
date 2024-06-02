import { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
    UserCredential as FirebaseUserCredential
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
    const registerUser = ({ email, password }: { email: string, password: string }) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = ({ email, password }: { email: string, password: string }) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
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


