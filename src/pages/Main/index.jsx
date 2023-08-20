import React, { useState, useEffect } from 'react';
import './main.css';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import Modal from '../../components/modal/index';
import ModalEditarRegistro from '../../components/modal-editar-registro/index';

import filter from '../../assets/filter.svg'
import logo from '../../assets/logo.svg'
import user from '../../assets/profile.svg'
import sair from '../../assets/sair.svg'
import data from '../../assets/data.svg'
import edit from '../../assets/edit.svg'
import dlt from '../../assets/delete.svg'

import api from '../../service/api';

let classe = '';

const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
};

const formatarValor = (valor) => {
    if (typeof valor === 'number') {
        return `R$${valor.toFixed(2)}`;
    }
    return '';
};

const TransacaoDiv = ({ data, tipo, descricao, categoria, valor, onDelete, onEdit }) => {

    const date = new Date(data);
    const diaEmMilesegundos = 24 * 60 * 60 * 1000;
    const dateTimeStamp = date.getTime();
    const dataMaisUm = dateTimeStamp + diaEmMilesegundos;

    const dataCorreta = new Date(dataMaisUm);


    let diaDaSemana = dataCorreta.getDay();

    if (diaDaSemana === 0) {
        diaDaSemana = "Domingo";
    } else if (diaDaSemana === 1) {
        diaDaSemana = "Segunda";
    } else if (diaDaSemana === 2) {
        diaDaSemana = "Terça";
    } else if (diaDaSemana === 3) {
        diaDaSemana = "Quarta";
    } else if (diaDaSemana === 4) {
        diaDaSemana = "Quinta";
    } else if (diaDaSemana === 5) {
        diaDaSemana = "Sexta";
    } else if (diaDaSemana === 6) {
        diaDaSemana = "Sábado";
    }

    if (tipo === 'entrada') {
        classe = 'entrada';
    } else {
        classe = 'saida';

    }

    return (
        <div className="infos-registros">
            <p className="data-registros">{format(dataCorreta, "dd/MM/yyyy")}</p>
            <p className="p">{diaDaSemana}</p>
            <p className="desc">{descricao}</p>
            <p className="categoria">{categoria}</p>
            <p className={classe}>{valor}</p>
            <img className="img-edit" src={edit} alt="" onClick={onEdit} />
            <img className="img-delete" src={dlt} alt="" onClick={onDelete} />
        </div>
    );
};

export default function Main() {
    const nome = localStorage.getItem('nome');

    const [transacoes, setTransacoes] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [showEditarModal, setShowEditarModal] = useState(false);
    const [registroEditandoId, setRegistroEditandoId] = useState(null);

    const [saldo, setSaldo] = useState(0);
    const [entrada, setEntrada] = useState(0);
    const [saida, setSaida] = useState(0);

    const fetchTransacoes = async () => {
        try {
            const token = localStorage.getItem('token');
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const response = await api.get('/transacao');
            setTransacoes(response.data);

            const extratoResponse = await api.get('/transacao/extrato');
            const saldo = extratoResponse.data.entrada - extratoResponse.data.saida
            setSaldo(saldo);
            setEntrada(extratoResponse.data.entrada);
            setSaida(extratoResponse.data.saida);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchTransacoes();
    }, []);

    const handleAddRegistro = () => {
        setShowModal(true);
    };
    const handleEditRegistro = (id) => {
        setRegistroEditandoId(id);
        setShowEditarModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const closeEditarModal = () => {
        setShowEditarModal(false);
    };
    const handleDeleteTransacao = async (id) => {
        try {
            const token = localStorage.getItem('token');
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            await api.delete(`/transacao/${id}`);
            fetchTransacoes();


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <header>
                <div className="header-icons">
                    <img src={logo} alt="icon-usuario" className="logo" />
                    <div className='user'>
                        <img src={user} alt="" />
                        <span>{nome}</span>
                        <Link to="/"><img src={sair} alt="" onClick={handleLogout} /></Link>
                    </div>
                </div>
            </header>

            <main>
                <button className="filter"><img src={filter} alt="Botão" /> Filtrar</button>

                <div className="infos">
                    <p className='p'>Data <img src={data} alt="" /></p>
                    <p className='p'>Dia da semana</p>
                    <p className='p'>Descrição</p>
                    <p className='p'>Categoria</p>
                    <p className='p'>Valor</p>
                </div>
                {transacoes.map((transacao) => (
                    <TransacaoDiv
                        key={transacao.id}
                        data={transacao.data}
                        descricao={transacao.descricao}
                        categoria={transacao.categoria_nome}
                        tipo={transacao.tipo}
                        valor={formatarValor(transacao.valor)}
                        onDelete={() => handleDeleteTransacao(transacao.id)}
                        onEdit={() => handleEditRegistro(transacao.id)}
                    />
                ))}
                <div className="resumo">
                    <h1>Resumo</h1>
                    <div className="resumo-states">
                        <div>
                            <span className='span'>Entradas</span>
                            <span className='entrada'>{formatarValor(entrada)}</span>
                        </div>
                        <div>
                            <span className='span'>Saídas</span>
                            <span className='saida'>{formatarValor(saida)}</span>
                        </div>
                    </div>
                    <div className='saldo-states'>
                        <span className="saldo">Saldo</span>
                        <span className="saldo-number">{formatarValor(saldo)}</span>
                    </div>
                </div>
                <button className="add-registro" onClick={handleAddRegistro}>Adicionar Registro</button>

            </main>
            {showModal && <Modal closeModal={closeModal} />}
            {showEditarModal && (
                <ModalEditarRegistro closeModal={closeEditarModal} registroId={registroEditandoId} />
            )}
        </div>
    )
}

