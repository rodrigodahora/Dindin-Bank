import './style.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import api from '../../service/api';

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post('/login', {
                email,
                senha: password,
            });

            if (response.status === 200) {
                console.log('Login realizado com sucesso!');
                const token = response.data.token;
                localStorage.setItem('token', token);
                const nameUser = response.data.usuario.nome;
                localStorage.setItem('nome', nameUser);

                navigate('/Main');
            } else {
                console.log('Erro ao fazer login:', response.data.mensagem);
            }
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);

        }
    };
    const handleSignUp = () => {
        navigate('/sign-up');
    };

    return (
        <>
            <div className="container">
                <img className='img-logo' src={logo} alt="Logo" />
                <div className="menu-container">
                    <div className="div-container">
                        <h1>Controle suas <span>finanças</span>,
                            sem planilha chata.</h1>
                        <p>Organizar as suas finanças nunca foi tão fácil,
                            com o DINDIN, você tem tudo num único lugar
                            e em um clique de distância.</p>
                        <button onClick={handleSignUp}>Cadastre-se</button>
                    </div>
                    <form className='form' onSubmit={handleLogin}>
                        <h2 className='h2-login'>Login</h2>

                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>

        </>
    )
}