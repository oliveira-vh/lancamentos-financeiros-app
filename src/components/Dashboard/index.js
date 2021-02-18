import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'



const Index = () => {
    const [error, setError] = React.useState("")
    const { logout, currentUser } = useAuth()
    const history = useHistory()

    const handleLogout = async() => {
        setError('')

        try{
            logout()
            history.push('/login')
        } catch(e) {
            setError('Erro ao deslogar!')
        }
    }
    return (
        <>
            <div>
                <div>
                    <h2>Perfil</h2>
                    {error && <p>{error}</p>}
                    <strong>Usuário: </strong>{currentUser.email}
                </div>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    )
}

export default Index
