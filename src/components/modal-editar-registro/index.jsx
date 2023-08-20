import './style.css';
import React, { useState, useEffect } from 'react';

import exit from '../../assets/exit-modal.svg'
import api from '../../service/api'

export default function ModalEditRegistro({ closeModal, registroId }) {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [listaCategoria, setListaCategoria] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [alert, setAlert] = useState('');
    const [entradaAtiva, setEntradaAtiva] = useState(false);
    const [saidaAtiva, setSaidaAtiva] = useState(false);

    const handleExitModalClick = () => {
        closeModal();
    };

    const handleCategoria = async () => {
        try {
            const token = localStorage.getItem('token');
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const response = await api.get('/categoria');
            setListaCategoria(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleCategoria();
    }, []);

    const handleEntradaClick = () => {
        setEntradaAtiva(true);
        setSaidaAtiva(false);
    };

    const handleSaidaClick = () => {
        setSaidaAtiva(true);
        setEntradaAtiva(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!valor) {
            setAlert('O valor é obrigatório');
            return;
        } else {
            setAlert('');
        }
        if (!categoria) {
            setAlert('A categoria é obrigatória');
            return;
        } else {
            setAlert('');
        }

        if (!data) {
            setAlert('A data é obrigatória');
            return;
        } else {
            setAlert('');
        }
        if (!descricao) {
            setAlert('A descrição é obrigatória');
            return;
        } else {
            setAlert('');
        }

        try {
            const token = localStorage.getItem('token');
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            await api.put(`/transacao/${registroId}`, {
                tipo: entradaAtiva ? 'entrada' : 'saida',
                descricao,
                valor,
                data,
                categoria_id: categoria,
            });

            setDescricao('');
            setValor('');
            setData('');
            setCategoria('');
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="modal-background"></div>
            <div className="modal">
                <div className="titulo-modal">
                    <h1>Editar Registro</h1>
                    <img
                        src={exit}
                        alt=""
                        className="exit-modal"
                        onClick={handleExitModalClick}
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="buttons">
                        <button
                            type="button"
                            className={entradaAtiva ? 'entrada-ativa' : ''}
                            onClick={handleEntradaClick}
                        >
                            Entrada
                        </button>
                        <button
                            type="button"
                            className={saidaAtiva ? 'saida-ativo' : ''}
                            onClick={handleSaidaClick}
                        >
                            Saída
                        </button>
                    </div>
                    <div className="input">
                        <span>Valor</span>
                        <input
                            type="text"
                            value={valor}
                            onChange={(event) => setValor(event.target.value)}
                        />
                    </div>
                    <div className="input">
                        <span>Categoria</span>
                        <select
                            name="categoria"
                            className="custom-select"
                            value={categoria}
                            onChange={(event) => setCategoria(event.target.value)}
                        >
                            <option value={null}>Selecione uma opção...</option>

                            {listaCategoria.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>
                                        {item.descricao}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="input">
                        <span>Data</span>
                        <input
                            type="date"
                            value={data}
                            onChange={(event) => setData(event.target.value)}
                        />
                    </div>
                    <div className="input">
                        <span>Descrição</span>
                        <input
                            type="text"
                            value={descricao}
                            onChange={(event) => setDescricao(event.target.value)}
                        />
                        <br />
                        <strong className="strong-alert">{alert}</strong>
                    </div>
                    <button type="submit" className="btn-confirm">
                        Confirmar
                    </button>
                </form>
            </div>
        </>
    );
}