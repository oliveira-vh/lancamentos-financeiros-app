import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

const Index = () => {
    const { logout } = useAuth()
    const history = useHistory()

    const handleLogout = async() => {
        logout()
        history.push('/login')
    }

    useEffect(() => {
        handleLogout()
    })
    return (
        <>
        </>
    )
}

export default Index
