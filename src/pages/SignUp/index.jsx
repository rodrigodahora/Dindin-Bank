import './signup.css';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import api from '../../service/api';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');

    const handleCadastro = async (event) => {
        event.preventDefault();

        if (senha !== confirmaSenha) {
            console.log('As senhas não coincidem');
            return;
        }

        const usuario = {
            nome: nome,
            email: email,
            senha: senha,
        };

        try {
            const response = await api.post('/usuario', usuario);

            if (response.status === 200 || response.status === 201 || response.status === 204) {
                console.log('Usuário cadastrado com sucesso!');
                navigate('/sign-in');
            } else {
                console.log(`Erro ao cadastrar usuário: ${response.data.mensagem}`);
            }
        } catch (error) {
            console.error(error);
            console.log('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.');
        }
    };
    return (

        <>

            <div className="container">
                <img className='img-logo' src={logo} alt="Logo" />
                <form className='form-sinup'>
                    <h2>Cadastro</h2>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name='nome' value={nome} onChange={(e) => setNome(e.target.value)} />

                    <label htmlFor="email" >E-mail</label>
                    <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Senha</label>
                    <input type="password" name='password' value={senha} onChange={(e) => setSenha(e.target.value)} />

                    <label htmlFor="conf-password">Confirmação de senha</label>
                    <input type="password" name='conf-password' value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} />
                    <button onClick={handleCadastro}>Cadastrar</button>
                    <Link to="/sign-in">Já tem cadastro? Clique aqui!</Link>

                </form>

            </div>

        </>
    )
}