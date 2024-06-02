import { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../firebase'
import { User } from '../lib/types'

const UserContext = createContext({})

const DefaultUser: User = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

export const AuthContextProvider = ({ children }: any) => {
    const [user, setUser] = useState(DefaultUser)
    const registerUser = (form: User) => {
        return createUserWithEmailAndPassword(auth, form.email, form.password)
    }

    const login = (form: User) => {
        return signInWithEmailAndPassword(auth, form.email, form.password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const checkLoginStatus = onAuthStateChanged(auth, (currentUser: any) => {
            console.log(currentUser)
            setUser(currentUser)
        })
        return () => {
            checkLoginStatus();
        }
    },[])

    return (
        <UserContext.Provider value={{ registerUser, user, logout, login }}>
            {children}
        </UserContext.Provider>
    )
}
export const UserAuth = () => {
    return useContext(UserContext)
}


