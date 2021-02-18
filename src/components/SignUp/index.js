import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const Index = () => {
    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    const passwordConfirmRef = React.useRef()
    const { signup } = useAuth()
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Senhas não são idênticas!')
        }

        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/login')
        } catch{
            setError('Erro ao criar a conta!')
        }
        setLoading(false)
    }

    return (
        <div>
            <div>
                <h2>Sign Up</h2>
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
                    <div id='password-confirm'>
                        <label>Confirmação da Senha</label>
                        <input type='password' ref={passwordConfirmRef} required/>
                    </div>
                    <button disabled={loading} type='submit'>Criar conta!</button>
                </form>
            </div>
            <div>Já tem uma conta? <Link to='/login'>Faça Login.</Link></div>
        </div>
    )
}

export default Index
