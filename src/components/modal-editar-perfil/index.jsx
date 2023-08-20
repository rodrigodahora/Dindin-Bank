import './style.css';
import exit from '../../assets/exit-modal.svg'
export default function ModalEditProfile() {

    return (
        <>

            <div className="modal-background"></div>
            <div className="modal">
                <div className="titulo-modal">
                    <h1>Editar Perfil</h1>
                    <img src={exit} alt="" className="exit-modal" />
                </div>

                <div className="input">
                    <span>Nome</span>
                    <input type="text" />
                </div>

                <div className="input">
                    <span>E-mail</span>
                    <input type="text" />
                </div>
                <div className="input">
                    <span>Senha</span>
                    <input type="password" />
                </div>
                <div className="input">
                    <span>Confirmação de Senha</span>
                    <input type="password" />
                </div>
                <button className="btn-confirm">Confirmar</button>
            </div>


        </>
    )
}