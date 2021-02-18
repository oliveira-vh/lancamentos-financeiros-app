import React from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return React.useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState()
    const [loading, setLoading] = React.useState(true)

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
