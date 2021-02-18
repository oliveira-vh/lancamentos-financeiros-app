import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const Index = () => {
    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    const { login } = useAuth()
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch{
            setError('Erro ao logar! Verifique suas credenciais.')
        }
        setLoading(false)
    }

    return (
        <div>
            <div>
                <h2>Login</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div id='email'>
                        <label>Email</label>
                        <input type='email' ref={emailRef} required/>
                    </div>
                    <div id='password'>
                        <label>Senha</label>
                        <input type='password' ref={passwordRef} required/>
                    </div>
                    <button disabled={loading} type='submit'>Entrar</button>
                </form>
            </div>
            <div>Não tem conta? <Link to='/signup'>Crie uma.</Link></div>
        </div>
    )
}

export default Index

